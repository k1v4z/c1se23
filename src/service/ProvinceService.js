module.exports = class ProvinceService {
    constructor(provinceRepository) {
        this.provinceRepository = provinceRepository
    }

    async getProvinceIdByName(provinceName) {
        const provinceId = await this.provinceRepository.getProvinceIdByName(provinceName)
        return provinceId
    }
    
}