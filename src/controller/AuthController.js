const AuthService = require("../service/AuthService");
const UserSchema = require("../schemas/UserSchema");
const container = require("../container/container");


module.exports = new class AuthController {
    async signUp(req, res) {
        const authBody = req.body
        const authService = new AuthService(container); //inject container
        const signUpState = await authService.signUp(authBody);
        return res.status(signUpState == 101 ? 201 : 200).json(signUpState)
    }

    async login() {
        const authBody = req.body
        if (!UserSchema.validateAuthUser(authBody).success) {
            return res.status(200).json(UserSchema.validateAuthUser(authBody).error)
        }
    }
}