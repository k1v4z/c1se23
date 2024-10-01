const AuthRepository = require("../repository/AuthRepository");
const AuthService = require("../service/AuthService");

module.exports = new class AuthController {
    async signUp(req, res) {
        const authBody = req.body
        const authService = new AuthService(new AuthRepository());
        const signUpState = await authService.signUp(authBody);

        res.status(200).json(signUpState)
    }
}