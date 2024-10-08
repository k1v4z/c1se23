const resultCodes = require("../constants/http_response/resultCode");
const appContainer = require("../container/registration/containerRegistration");
const containerNames = require("../constants/container_name/containerNames");
const serviceNames = require("../constants/service_name/serviceNames");


module.exports = new class AuthController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.authService = serviceContainer.get(serviceNames.AUTH_SERVICE)
    }

    signUp = async (req, res) => {
        const authBody = req.body
        const signUpState = await this.authService.signUp(authBody);
        return res.status(signUpState.code == resultCodes.register.success ? 201 : 200).json(signUpState)
    }

    login = async (req, res) => {
        const authBody = req.body
        const login = await this.authService.login(authBody)
        if (login.accessToken) {
            res.cookie('accessToken', login.accessToken, {
                signed: true,
                httpOnly: true,
                maxAge: 30 * 60 * 1000,
                sameSite: 'None'
            })
        }

        return res.status(login.code == 101 ? 201 : 200).json(login)
    }

    logout = async (req, res) => {
        const accessToken = req.signedCookies.accessToken
        const logout = this.authService.logout(accessToken)

        if (logout.code == resultCodes.logout.success) {
            res.clearCookie('accessToken', {
                httpOnly: true,
                sameSite: 'None'
            })
        }

        return res.status(200).json(logout)
    }
}