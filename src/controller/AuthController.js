const AuthService = require("../service/AuthService");
const resultCodes = require("../constants/http_response/resultCode");
const appContainer = require("../container/registration/containerRegistration");


module.exports = new class AuthController {
    constructor() {
        this.authService = new AuthService(appContainer) //inject container
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