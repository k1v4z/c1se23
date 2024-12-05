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
        this.router.post('/users', AuthMiddleware.authenticateUser, AuthMiddleware.authorizeRole(role.ADMIN), UserController.addUser)
        this.router.delete('/users/:username', AuthMiddleware.authenticateUser, AuthMiddleware.authorizeRole(role.ADMIN), UserController.deleteUser)
        this.router.get('/user/search/:username', AuthMiddleware.authenticateUser, AuthMiddleware.authorizeRole(role.ADMIN), UserController.seacrhUser)
        this.router.put('/users/:username/status', AuthMiddleware.authenticateUser, AuthMiddleware.authorizeRole(role.ADMIN), UserController.setStatus)
        this.router.put('/users/:username/password', AuthMiddleware.authenticateUser, UserController.changePassword)
        this.router.post('/users/:username/slack-bot', AuthMiddleware.authenticateUser, UserController.addSlackBotCredentials)
        this.router.put('/users/:username/role', AuthMiddleware.authenticateUser, AuthMiddleware.authorizeRole(role.ADMIN), UserController.setUserRole);
    }

}