const appContainer = require("../container/registration/containerRegistration")
const TokenService = require("../service/TokenService")

module.exports = new class AuthMiddleware {
    constructor(){
        this.tokenService = new TokenService(appContainer)
    }

    authenticateUser = (req, res, next) => {
        const accessToken = req.signedCookies.accessToken
        try{
            const payload = this.tokenService.verifyToken(accessToken)
            next()
        }catch(err){
            console.log(err);
            return res.status(401).json({
                error: "Access token is missing or invalid"
            })
        }
    }
}