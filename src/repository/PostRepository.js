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
                    } : undefined0
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

    async getPosts(page = 1, limit = 10, filters = {}) {
        try {
            const offset = (page - 1) * limit

            const posts = await prisma.posts.findMany({
                skip: offset,
                take: limit,
                where: filters,
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            name: true
                        }
                    },
                    post_images: true,
                    comments: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    name: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    post_date: 'desc'
                }
            })

            const total = await prisma.posts.count({ where: filters })

            return {
                posts,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalPosts: total
                }
            }
        } catch (error) {
            console.error('Error fetching posts:', error)
            throw new Error('Failed to fetch posts')
        }
    }

    async updatePost(id, data) {
        try {
            // First, verify the post belongs to the user
            const existingPost = await prisma.posts.findUnique({
                where: {
                    id: id,
                    user_id: data.user_id
                }
            })

            if (!existingPost) {
                throw new Error('Post not found or unauthorized')
            }

            // Update post with optional image update
            const updatedPost = await prisma.posts.update({
                where: { id: id },
                data: {
                    title: data.title,
                    content: data.content,
                    ...(data.images && data.images.length > 0 && {
                        post_images: {
                            deleteMany: {},
                            create: images.map(imageUrl => ({ image_url: imageUrl }))
                        }
                    })
                },
                include: {
                    post_images: true
                }
            })

            return updatedPost
        } catch (error) {
            console.error('Error updating post:', error)
            throw new Error('Failed to update post')
        }
    }

    async deletePost(postId, userId) {
        try {
            // First, verify the post belongs to the user
            const existingPost = await prisma.posts.findUnique({
                where: {
                    id: postId,
                    user_id: userId
                }
            });

            if (!existingPost) {
                throw new Error('Post not found or unauthorized');
            }

            // Delete in correct order to handle foreign key constraints
            await prisma.$transaction([
                // First delete related records
                prisma.post_images.deleteMany({
                    where: { post_id: postId }
                }),
                prisma.comments.deleteMany({
                    where: { post_id: postId }
                }),
                // Then delete the post
                prisma.posts.delete({
                    where: { id: postId }
                })
            ]);

            return existingPost;
        } catch (error) {
            console.error('Error deleting post:', error);
            throw new Error('Failed to delete post');
        }
    }
}