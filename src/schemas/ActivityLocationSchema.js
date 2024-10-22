const { z } = require("zod")
// Define a regex for the HH:MM format
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

module.exports = new class ActivityLocationSchema {
    getActivityLocationSchema() {
        const activityLocationSchema =  z.object({
            name: z.string(),
            address: z.string(),
            open_at: z.string().regex(timeRegex, {
                message: "Invalid time format. Expected HH:MM."
            }),
            close_at: z.string().regex(timeRegex, {
                message: "Invalid time format. Expected HH:MM."
            }),
            longitude: z.number(),
            latitude: z.number(),
            imageUrl: z.string(),
            locationType: z.string()
        })

        return activityLocationSchema;
    }

    validateActivityLocation = (data) => {
        return this.getActivityLocationSchema().safeParse(data)
    }
}