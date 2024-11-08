const prisma = require("../../prisma/db");

module.exports = class KindRepository {
    async getKindIdByName(kindName) {
        const kindId = await prisma.kinds.findMany({
            where: {
                name: kindName
            }
        })
        
        return kindId
    }
}