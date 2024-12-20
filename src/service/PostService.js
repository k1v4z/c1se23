module.exports = class PostService {
    constructor(postRepository, commentService) {
        this.postRepository = postRepository
        this.commentService = commentService
    }

    async createPost(data) {
        return await this.postRepository.createPost(data);
    }
}