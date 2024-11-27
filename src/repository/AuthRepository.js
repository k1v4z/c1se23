const prisma = require("../../prisma/db");
const role = require("../constants/role");

module.exports = class AuthRepository {
    async signUp(username, hashPassword) {
        const user = await prisma.users.create({
            data: {
                username: username,
                password: hashPassword,
            }
        })
 
        //add default role for user
        await prisma.user_roles.create({
            data: {
                user_id: user.id,
                role_id: role.TOURIST,
            }
        })

        return user
    }

    async getHashPassword(username) {
        const hashPassword = await prisma.users.findUnique({
            where: {
                username: username
            },
            select: {
                password: true
            }
        })

        return hashPassword
    }
}