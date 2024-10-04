var jwt = require('jsonwebtoken')
const secretKey = process.env.SERCRET_KEY

module.exports = class TokenService{
    constructor(container){
        
    }

    generateAccessToken(payload){
        const token = jwt.sign(
            payload,
            secretKey,
            {
                algorithm: "HS256",
                expiresIn: "30m"
            }
        )

        return token
    }

    checkToken(token){
        return token ? true : false
    }
    
}