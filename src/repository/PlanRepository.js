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
                location: plan.location,
                money: plan.money,
                transportation: plan.transportation,
                activities: {
                    create: plan.activities
                },
                plan_images: {
                    create: {
                        image_url: plan.image_url
                    }
                }
            },
            include: {
                activities: {
                    include: {
                        activity_thumbs: true
                    }
                },
                plan_images: true,
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

    async getPlan(userId) {
        const plans = await prisma.plans.findMany({
            select: {
                plan_images: {
                    select: {
                        image_url: true
                    }
                },
                activities: {
                    select: {
                        id: true,
                        name: true,
                        start_time: true,
                        end_time: true,
                        activity_thumbs: {
                            select: {
                                image_url: true
                            }
                        }
                    }
                },
            },
            where: {
                user_id: userId,
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
        //Step 1: Delete all Activity_thumbs regarding Activities of Plan
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

        const deleteAcvitityThumbs = prisma.activity_thumbs.deleteMany({
            where: {
                activity_id: {
                    in: activityId
                }
            }
        })

        const deleteNotifications = prisma.notifications.deleteMany({
            where: {
                id: {
                    in: activityId
                }
            }
        })

        //Step 2: Delete all activities regarding plans
        const deleteActivities = prisma.activities.deleteMany({
            where: {
                plan_id: planId
            }
        })

        const deletePlanImages = prisma.plan_images.delete({
            where: {
                plan_id: planId
            }
        })

        const deletePlan = prisma.plans.delete({
            where: {
                id: planId
            }
        })

        await prisma.$transaction([deleteAcvitityThumbs, deleteNotifications, deleteActivities, deletePlanImages, deletePlan])

    }
}