const resultCodes = require("../constants/http_response/resultCode");
const appContainer = require("../container/registration/containerRegistration");
const containerNames = require("../constants/container_name/containerNames");
const serviceNames = require("../constants/service_name/serviceNames");

module.exports = new class GemininiController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.commentService = serviceContainer.get(serviceNames.COMMENT_SERVICE)
    }

    createComment = async (req, res) => {
        try {
            const data = req.body
            const postId = req.params.id
            data.user_id = req.userId

            const results = await this.commentService.createComment(postId, data)

            return res.status(201).json(results)
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }

    getComments = async (req, res) => {
        try {
            const postId = req.params.id
            const { page, limit } = req.query
            const results = await this.commentService.getComments(postId, page, limit)

            return res.status(200).json(results)
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }

    deleteComment = async (req, res) => {
        try {
            const commentId = req.params.commentId;
            const postId = req.params.postId;
            const userId = req.userId;

            const results = await this.commentService.deleteComment(postId, commentId, userId)

            return res.status(200).json(results)
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }
}