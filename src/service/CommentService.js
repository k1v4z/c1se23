module.exports = class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository
    }

    async createComment(postId, data) {
        return await this.commentRepository.createComment(postId, data);
    }

    async getComments(postId, page, limit) {
        return await this.commentRepository.getComments(postId, Number(page), Number(limit));
    }

    async deleteComment(postId, commentId, userId) {
        return await this.commentRepository.deleteComment(postId, commentId, userId);
    }
}