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
        this.router.get('/posts', PostController.getPosts)
        this.router.put('/post/:id', AuthMiddleware.authenticateUser, PostController.updatePost)
        this.router.delete('/post/:id', AuthMiddleware.authenticateUser, PostController.deletePost)
    }

}