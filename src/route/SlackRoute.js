const SlackController = require("../controller/SlackController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const BaseRoute = require("./BaseRoute");

module.exports = new class SlackRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.post('/slack-credential',AuthMiddleware.authenticateUser,SlackController.addSlackCredentials)
    }

}