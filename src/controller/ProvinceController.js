const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")

module.exports = new class ProvinceController {
    constructor(){
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.provinceService = serviceContainer.get(serviceNames.PROVINCE_SERVICE)
    }

    getProvinces = async (req, res) => {
        const provinceName = req.query.provinceName
        const provinces = await this.provinceService.getProvinceIdByName(provinceName)
        return res.status(200).json(provinces)
    }
}