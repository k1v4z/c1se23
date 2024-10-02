const AuthService = require("../service/AuthService");
const container = require("../container/container");
const resultCodes = require("../constants/ResultCode");

module.exports = new class AuthController {
    async signUp(req, res) {
        const authBody = req.body
        const authService = new AuthService(container); //inject container
        const signUpState = await authService.signUp(authBody);
        return res.status(signUpState.code == resultCodes.register.success ? 201 : 200).json(signUpState)
    }

    async login(req, res) {
        const authBody = req.body
        const authService = new AuthService(container)
        const login = await authService.login(authBody)
        if (login.accessToken) {
            res.cookie('accessToken', login.accessToken, {
                signed: true,
                httpOnly: true,
                maxAge: 30 * 60 * 1000
            })
        }

        return res.status(login.code == 101 ? 201 : 200).json(login)
    }
}