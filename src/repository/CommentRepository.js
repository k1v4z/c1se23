const prisma = require("../../prisma/db");
module.exports = class CommentRepository {
    async createComment(postId, data) {
        try {
            console.log('Creating comment:', postId);

            // Verify post exists
            const postExists = await prisma.posts.findUnique({
                where: { id: postId }
            })

            if (!postExists) {
                throw new Error('Post not found')
            }

            const comment = await prisma.comments.create({
                data: {
                    user_id: data.user_id,
                    post_id: postId,
                    content: data.content,
                    channel_id: postId
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            name: true
                        }
                    }
                }
            })

            return comment
        } catch (error) {
            console.error('Error adding comment:', error)
            throw new Error('Failed to add comment')
        }
    }

    async getComments(postId, page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit

            const comments = await prisma.comments.findMany({
                where: { post_id: postId },
                skip: offset,
                take: limit,
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    comment_date: 'desc'
                }
            })

            const total = await prisma.comments.count({
                where: { post_id: postId }
            })

            return {
                comments,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalComments: total
                }
            }
        } catch (error) {
            console.error('Error fetching comments:', error)
            throw new Error('Failed to fetch comments')
        }
    }

    async deleteComment(postId, commentId, userId) {
        try {
            // Verify that:
            // 1. The comment exists
            // 2. It belongs to the specified post
            // 3. It belongs to the user trying to delete it
            const existingComment = await prisma.comments.findFirst({
                where: {
                    AND: [
                        { id: commentId },
                        { post_id: postId },
                        { user_id: userId }
                    ]
                }
            })

            if (!existingComment) {
                throw new Error('Comment not found or unauthorized')
            }

            // Delete the comment
            const deletedComment = await prisma.comments.delete({
                where: { id: commentId }
            })

            return deletedComment
        } catch (error) {
            console.error('Error deleting comment:', error)
            throw new Error('Failed to delete comment')
        }
    }

}