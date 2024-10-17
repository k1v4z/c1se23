const prisma = require("../../prisma/db");

module.exports = class ProvinceRepository {
    async getProvinceIdByName(provinceName) {
        const provinceId = await prisma.provinces.findMany({
            where: {
                name: provinceName
            }
        })

        return provinceId
    }
}