const prisma = require("../../prisma/db");

module.exports = class PostRepository {
    async createPost(data) {
        try {
            // Extract URLs from image objects if they exist
            const imageUrls = data.images?.map(img => ({
                image_url: img.url || img // Handle both {url: string} and direct string cases
            }));

            const post = await prisma.posts.create({
                data: {
                    user_id: data.user_id,
                    title: data.title,
                    content: data.content,
                    post_images: imageUrls && imageUrls.length > 0 ? {
                        create: imageUrls
                    } : undefined
                },
                include: {
                    post_images: true
                }
            });
            return post;
        } catch (error) {
            console.error('Error creating post:', error);
            throw new Error('Failed to create post');
        }
    }
}