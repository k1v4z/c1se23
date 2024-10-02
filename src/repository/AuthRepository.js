const prisma = require("../../prisma/db");

module.exports = class AuthRepository {
    async signUp(username, hashPassword) {
        const user = await prisma.users.create({
            data: {
                username: username,
                password: hashPassword
            }
        })

        return user
    }

    async getHashPassword(username){
        const hashPassword = await prisma.users.findUnique({
            where:{
                username: username
            },
            select:{
                password: true
            }
        })

        return hashPassword
    }
}