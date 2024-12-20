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
}