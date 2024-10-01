const resultCodes = require("../constants/ResultCode");
const UserSchema = require("../schemas/UserSchema");

module.exports = class AuthService {
    constructor(repository) {
        this.repository = repository
    }

    async signUp(authBody) {
        //Validate username, password
        if (!UserSchema.validateAuthUser(authBody).success) {
            return UserSchema.validateAuthUser(authBody).error
        }
        try {
            const user = await this.repository.getUsername(authBody.username);

            if (!user) {
                await this.repository.createUser(authBody)

                return {
                    code: resultCodes.register.success,
                    message: "Sign up successful",
                    user: authBody.username
                }
            } else {
                return {
                    code: resultCodes.register.userExisted,
                    message: "User existed"
                }
            }
        } catch (err) {
            console.log(err);

            return {
                code: resultCodes.register.error,
                message: "Error when processing, try again later"
            }
        }

    }
}