const PlanController = require("../controller/PlanController")
const BaseRoute = require("./BaseRoute")

module.exports = new class PlanRoute extends BaseRoute{
    constructor(){
        super()
    }

    initRoutes(){
        this.router.post('/create-plan', PlanController.createPlan)
    }
}