const PlanController = require("../controller/PlanController")
const AuthMiddleware = require("../middleware/AuthMiddleware")
const BaseRoute = require("./BaseRoute")

module.exports = new class PlanRoute extends BaseRoute{
    constructor(){
        super()
    }

    initRoutes(){
        this.router.post('/create-plan',AuthMiddleware.authenticateUser,PlanController.createPlan)
    }
}