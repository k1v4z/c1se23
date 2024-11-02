const ProvinceController = require("../controller/ProvinceController");
const BaseRoute = require("./BaseRoute");

module.exports = new class ProvinceRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.get('/provinces', ProvinceController.getProvinces)
    }

}