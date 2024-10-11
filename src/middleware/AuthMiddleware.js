const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")

module.exports = new class AuthMiddleware {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.tokenService = serviceContainer.get(serviceNames.TOKEN_SERVICE)
    }

    authenticateUser = (req, res, next) => {
        const accessToken = req.signedCookies.accessToken
        try {
            const payload = this.tokenService.verifyToken(accessToken)
            next()
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                error: "Access token is missing or invalid"
            })
        }
    }
}