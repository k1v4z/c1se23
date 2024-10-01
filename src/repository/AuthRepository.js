var bcrypt = require('bcryptjs');
const prisma = require("../../prisma/db");
const salt = require('../helper/BcryptHelper');

module.exports = class AuthRepository {
    async getUsername(username) {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        })

        return user
    }

    //Auth params meanings username, password
    async createUser(authParams) {
        var hashPassword = bcrypt.hashSync(authParams.password, salt)
        
        const user = await prisma.users.create({
            data: {
                username: authParams.username,
                password: hashPassword
            }
        })

        return user
    }
}