const prisma = require("../../prisma/db");

module.exports = class SlackRepository {
    async addSlackCredentials(userId, channelId, accessToken) {
        try {
            // Check if credentials already exist
            const existing = await prisma.slackTokens.findUnique({
                where: {
                    user_id: userId
                }
            });

            if (existing) {
                // Update existing record
                return await prisma.slackTokens.update({
                    where: {
                        user_id: userId
                    },
                    data: {
                        accessToken: accessToken,
                        channelId: channelId,
                    }
                });
            }

            // Create new record
            return await prisma.slackTokens.create({
                data: {
                    user_id: userId,
                    accessToken: accessToken,
                    channelId: channelId
                }
            });
        } catch (error) {
            throw new Error(`Failed to manage Slack credentials: ${error.message}`);
        }
    }
}