const role = require("../constants/role");
const PostController = require("../controller/PostController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const BaseRoute = require("./BaseRoute");

module.exports = new class PostRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.post('/post', AuthMiddleware.authenticateUser, PostController.createPost)
    }

}