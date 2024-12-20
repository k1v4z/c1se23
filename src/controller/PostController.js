const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")

module.exports = new class PostController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.postService = serviceContainer.get(serviceNames.POST_SERVICE)
    }

    createPost = async (req, res) => {
        const data = req.body
        try {
            data.user_id = req.userId

            // Xử lý image_urls
            if (data.image_urls && data.image_urls.length > 0) {
                data.images = data.image_urls.map(url => ({ url }));
                delete data.image_urls;
            }

            const post = await this.postService.createPost(data);
            return res.status(201).json({ message: 'Post created successfully', post });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error creating post', error: err.message });
        }
    }

    getPosts = async (req, res) => {
        try {
            const { page, limit } = req.query;
            const posts = await this.postService.getPosts(page, limit);
            return res.status(200).json({ posts });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error fetching posts', error: err.message });
        }
    }

    updatePost = async (req, res) => {
        const data = req.body;
        const { id } = req.params;
        try {
            data.user_id = req.userId
            const post = await this.postService.updatePost(id, data);
            return res.status(200).json({ message: 'Post updated successfully', post });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error updating post', error: err.message });
        }
    }
    
    deletePost = async (req, res) => {
        const { id } = req.params;
        try {
            await this.postService.deletePost(id, req.userId);
            return res.status(200).json({ message: 'Post deleted successfully' });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error deleting post', error: err.message });
        }
    }
}