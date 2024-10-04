const AuthService = require("../service/AuthService");
const resultCodes = require("../constants/resultCode");
const appContainer = require("../container/registration/containerRegistration");


module.exports = new class AuthController {
    async signUp(req, res) {
        const authBody = req.body
        const authService = new AuthService(appContainer); //inject container
        const signUpState = await authService.signUp(authBody);
        return res.status(signUpState.code == resultCodes.register.success ? 201 : 200).json(signUpState)
    }

    async login(req, res) {
        const authBody = req.body
        const authService = new AuthService(appContainer)
        const login = await authService.login(authBody)
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

    async logout(req, res) {
        const accessToken = req.signedCookies.accessToken
        const authService = new AuthService(appContainer)
        const logout = authService.logout(accessToken)

        if (logout.code == resultCodes.logout.success) {
            res.clearCookie('accessToken', {
                httpOnly: true,
                sameSite: 'None'
            })
        }

        return res.status(200).json(logout)
    }
}