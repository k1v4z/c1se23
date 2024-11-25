const ActivityLocationController = require("../controller/ActivityLocationController")
const BaseRoute = require("./BaseRoute")

module.exports = new class ActivityLocationRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.get('/activity-locations', ActivityLocationController.getActivityLocation)
        this.router.post('/activity-location', ActivityLocationController.createActivityLocation)
        this.router.delete('/activity-location/:id', ActivityLocationController.deleteActivityLocation)
        this.router.patch('/activity-location/:id', ActivityLocationController.editActivityLocation)
        this.router.get('/activity-location-by-address', ActivityLocationController.getActivityLocationByAddress)
    }
}