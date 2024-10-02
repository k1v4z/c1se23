var bcrypt = require('bcryptjs');
const prisma = require("../../prisma/db");
const salt = require('../helper/BcryptHelper');

module.exports = class AuthRepository {
    //Auth params meanings username, password
    async signUp(authParams) {
        var hashPassword = bcrypt.hashSync(authParams.password, salt)
        
        const user = await prisma.users.create({
            data: {
                username: authParams.username,
                password: hashPassword
            }
        })

        return user
    }

    async login(){
        
    }
}