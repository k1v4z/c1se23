var jwt = require('jsonwebtoken')
const secretKey = process.env.SERCRET_KEY

module.exports = class TokenService{
    constructor(){
        
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

    verifyToken(token){
        const payload = jwt.verify(token, secretKey)
        return payload
    }
    
}