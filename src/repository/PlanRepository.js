const prisma = require("../../prisma/db");

module.exports = class PlanRepository {
    async createPlan(plan) {
        const newPlan = await prisma.plans.create({
            data: {
                user: {
                    connect: {
                        id: plan.user_id
                    }
                },
                title: plan.title,
                date: plan.date,
                isChildren: plan.have_children,
                kind: {
                    connect: {
                        id: plan.kind_id,
                        name: plan.kind_name
                    }
                },
                money: plan.money,
                transportation: plan.transportation,
                activities: {
                    create: plan.activities
                },
                plan_on_province: {
                    create: {
                        province_id: plan.provinceId
                    }
                }
            },
            include: {
                activities: true,
                plan_on_province: true
            }
        })

        return newPlan;
    }

    async editPlan(planData) {
        const editedPlan = await prisma.plans.update({
            data: {
                title: planData.title,
                date: planData.date,
                isChildren: planData.have_children,
                kind: planData.kind_id,
                transportation: planData.transportation,
            },
            where: {
                id: planData.id,
                user_id: planData.user_id
            }
        })

        return editedPlan
    }

    async getPlan(planId, userId) {       
        const plans = await prisma.plans.findMany({
            where: {
                id: planId,
                user_id: userId
            },
            select: {
                title: true,
                date: true,
                activities: {
                    select: {
                        id: true,
                        start_date: true,
                        end_date: true,
                        activity_location: true
                    }
                },
                plan_on_province: {
                    select: {
                        province: {
                            select: {
                                name: true,
                                imageUrl: true
                            }
                        }
                    }
                }
            },
        })
        
        return plans
    }

    async getAllPlans(userId, page, limit){
        const totalPlans = await prisma.plans.count({
            where: {
                user_id: userId
            }
        })

        const totalPages = Math.ceil(totalPlans / limit)

        const plans = await prisma.plans.findMany({
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
            where: {
                user_id: userId
            },
            select: {
                id: true,
                title: true,
                date: true,
                transportation: true,
                kind: {
                    select: {
                        name: true
                    }
                },
                plan_on_province: {
                    select: {
                        province: {
                            select: {
                                name: true,
                                imageUrl: true
                            }
                        }
                    }
                }
            }
        })

        return {
            plans: plans,
            totalPages: totalPages
        }
    }

    async getPlanById(planId) {
        const plan = await prisma.plans.findMany({
            select: {
                id: true
            },
            where: {
                id: planId
            }
        })

        return [plan]
    }

    async deletePlan(planId) {
        //Step 1: Get all activities first
        const activities = await prisma.activities.findMany({
            where: {
                plan_id: planId
            },
            select: {
                id: true
            }
        })

        const activityId = activities.map((activity) => {
            return activity.id
        })

        //Step 2: Delete notifications regarding each activity
        const deleteNotifications = prisma.notifications.deleteMany({
            where: {
                activity_id: {
                    in: activityId
                }
            }
        })

        //Step 3: Delete all activities regarding plan
        const deleteActivities = prisma.activities.deleteMany({
            where: {
                plan_id: planId
            }
        })

        //Step 4: Delete plan on province
        const deletePlanOnProvince = prisma.plan_on_province.deleteMany({
            where: {
                plan_id: planId
            }
        })

        //Step 5: Delete plan finally
        const deletePlan = prisma.plans.delete({
            where: {
                id: planId
            }
        })

        await prisma.$transaction([deleteNotifications, deleteActivities, deletePlanOnProvince, deletePlan])

    }
}