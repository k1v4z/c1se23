const PlanController = require("../controller/PlanController")
const AuthMiddleware = require("../middleware/AuthMiddleware")
const BaseRoute = require("./BaseRoute")

module.exports = new class PlanRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.post('/create-plan', AuthMiddleware.authenticateUser, PlanController.createPlan)
        this.router.get('/get-plan', AuthMiddleware.authenticateUser, PlanController.getPlan)
        this.router.delete('/delete-plan/:id', AuthMiddleware.authenticateUser, PlanController.deletePlan)
        this.router.put('/edit-plan/:id', AuthMiddleware.authenticateUser, PlanController.editPlan)
    }
}