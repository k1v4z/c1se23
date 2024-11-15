const NotifyController = require("../controller/NotifyController")
const BaseRoute = require('./BaseRoute')

module.exports = new class NotificationRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.post('/slack/send-notifications', NotifyController.sendSlackMessage)
    }

}