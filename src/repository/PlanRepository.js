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
                }
            },
            include: { activities: true }
        })

        return newPlan;
    }
}