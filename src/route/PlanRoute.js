const ActivityLocationController = require("../controller/ActivityLocationController")
const PlanController = require("../controller/PlanController")
const AuthMiddleware = require("../middleware/AuthMiddleware")
const BaseRoute = require("./BaseRoute")

module.exports = new class PlanRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.post('/create-plan', AuthMiddleware.authenticateUser, PlanController.createPlan)
        this.router.get('/plan/:id', AuthMiddleware.authenticateUser, PlanController.getPlan)
        this.router.delete('/delete-plan/:id', AuthMiddleware.authenticateUser, PlanController.deletePlan)
        this.router.put('/edit-plan/:id', AuthMiddleware.authenticateUser, PlanController.editPlan)
        this.router.get('/plans', AuthMiddleware.authenticateUser, PlanController.getAllPlans)
        this.router.get('/activity-location-by-province', ActivityLocationController.getActivityLocationsByProvince)
        this.router.put('/plan/:id/add-activity-locations', AuthMiddleware.authenticateUser, PlanController.addActivityLocationsToPlan);
        this.router.delete('/plan/:id/remove-activity', AuthMiddleware.authenticateUser, PlanController.removeActivityFromPlan);
    }
}