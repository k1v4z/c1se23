const role = require("../constants/role");
const UserController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const BaseRoute = require("./BaseRoute");

module.exports = new class UserRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.get('/users', AuthMiddleware.authenticateUser, AuthMiddleware.authorizeRole(role.ADMIN), UserController.getUsers)
    }

}