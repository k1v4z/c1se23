const { z } = require("zod")
const iso8601DateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

module.exports = new class MainPlanSchema {
    getActivitySchema() {
        const activitySchema = z.object({
            name: z.string(),
            image_url: z.string(),
            start_time: z.string().refine((val) => iso8601DateRegex.test(val), {
                message: "Invalid ISO 8601 date format"
            }),
            end_time: z.string().refine((val) => iso8601DateRegex.test(val), {
                message: "Invalid ISO 8601 date format"
            }),
            longitude: z.number(),
            latitude: z.number()
        })

        return activitySchema
    }

    getPlanSchema() {
        const planSchema = z.object({
            user_id: z.string(),
            title: z.string(),
            date: z.string().refine((val) => iso8601DateRegex.test(val), {
                message: "Invalid ISO 8601 date format"
            }),
            location: z.string(),
            image_url: z.string(),
            transportation: z.string(),
            money: z.number(),
            state: z.enum(["pending", "confirmed", "cancelled"]), // if there are specific states
            have_children: z.boolean(),
            kind_name: z.string(),
            activities: z.array(this.getActivitySchema()), //One Plan have many activities
        });

        return planSchema
    }

    getMainPlanSchema() {
        const mainPlanSchema = z.object({
            plan: this.getPlanSchema()
        })

        return mainPlanSchema
    }

    validateMainPlan = (data) => {
        return this.getMainPlanSchema().safeParse(data)
    }
}