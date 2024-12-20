const role = require("../constants/role");
const UserController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const BaseRoute = require("./BaseRoute");

module.exports = new class CommentRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        
    }

}