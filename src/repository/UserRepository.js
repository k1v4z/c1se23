const prisma = require("../../prisma/db");

module.exports = class UserRepository {
    //Get user by username
    async getUsername(username) {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        })
        
        return user
    }
}