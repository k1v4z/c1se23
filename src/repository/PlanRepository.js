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

    async editPlan(planId, planData) {
        const p = await prisma.plans.update({
            where: {
                id: planId,
            },
            data: {
                title: planData.title,
                date: planData.date,
                isChildren: planData.have_children,
                kind: {
                    connect: {
                        id: planData.kindId,
                        name: planData.kind_name
                    },
                },
                location: planData.location,
                money: planData.money,
                transportation: planData.transportation,
                activities: {
                    update: planData.activities.map((activity) => ({
                        where: {
                            id: activity.id // Giả sử mỗi activity có id để xác định bản ghi
                        },
                        data: {
                            name: activity.name,
                            start_time: activity.start_time,
                            end_time: activity.end_time,
                            longitude: activity.longitude,
                            latitude: activity.latitude,
                            activity_thumbs: {
                                update: {
                                    where: {
                                        activity_id: activity.id, // ID của activity_thumbs mà bạn muốn cập nhật
                                    },
                                    data: {
                                        image_url: activity.image_url, // Cập nhật image_url
                                    },
                                },
                            },
                        },
                    })),
                },
                plan_images: {
                    update: {
                        where: {
                            plan_id: planId, // Điều kiện xác định bản ghi hình ảnh bạn muốn cập nhật
                        },
                        data: {
                            image_url: planData.image_url,
                        },
                    },
                },
            },
        });

        console.log(p);

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