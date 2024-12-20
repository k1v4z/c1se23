module.exports = class PostService {
    constructor(postRepository, commentService) {
        this.postRepository = postRepository
        this.commentService = commentService
    }

    async createPost(data) {
        return await this.postRepository.createPost(data);
    }

    async getPosts(page = 1, limit = 10) {
        const posts = this.postRepository.getPosts(Number(page), Number(limit));
        return posts
    }

    async updatePost(id, data) {
        return await this.postRepository.updatePost(id, data);
    }

    async deletePost(id, userId) {
        return await this.postRepository.deletePost(id, userId);
    }
}