const role = require("../constants/role");
const CommentController = require("../controller/CommentController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const BaseRoute = require("./BaseRoute");

module.exports = new class CommentRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.post("/comment/post/:id", AuthMiddleware.authenticateUser, CommentController.createComment);
        this.router.get("/comment/post/:id", CommentController.getComments);
        this.router.delete("/comment/:commentId/post/:postId", AuthMiddleware.authenticateUser, CommentController.deleteComment);
    }
}