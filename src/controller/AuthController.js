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
        if (signUpState.code == resultCodes.register.success) {
            return res.status(201).json(signUpState)
        } else if (signUpState.code == resultCodes.register.userExisted) {
            return res.status(200).json(signUpState)
        }

        return res.status(500).json({
            message: "Error when sign up, try again later"
        })
    }

    login = async (req, res) => {
        const authBody = req.body
        const login = await this.authService.login(authBody)
        if (login.accessToken) {
            res.cookie('accessToken', login.accessToken, {
                signed: true,
                httpOnly: true,
                maxAge: 30 * 60 * 1000,
                sameSite: 'strict'
            })
        }

        return res.status(login.code == 101 ? 201 : 200).json(login)
    }

    logout = async (req, res) => {
        const accessToken = req.signedCookies.accessToken
        const logout = this.authService.logout(accessToken)

        if (logout.code == resultCodes.logout.success) {
            res.cookie('accessToken', '', {
                expires: new Date(0),  // Set to a past date to expire the cookie immediately
                httpOnly: true,       // Include if the original cookie was httpOnly
                path: '/'             // Ensure the path matches the original cookie
            });
        }

        return res.status(200).json(logout)
    }

    checkTokenInCookie = (req, res) => {
        const accessToken = req.signedCookies.accessToken

        if (accessToken) {
            return res.status(200).json({
                haveToken: true
            })
        }

        return res.status(200).json({
            haveToken: false
        })
    }
}