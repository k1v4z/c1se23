const { z } = require("zod")

module.exports = new class PaginationSchema {
    getPaginationSchema(){
        const paginationSchema = z.object({
            page: z.number(),
            limit: z.number()
        })

        return paginationSchema
    }

    validatePagination(paginationParams){
        return this.getPaginationSchema().safeParse(paginationParams)
    }
}