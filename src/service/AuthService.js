const resultCodes = require("../constants/ResultCode");
const UserSchema = require("../schemas/UserSchema");

module.exports = class AuthService {
    constructor(container) {
        this.userRepository = container.get('userRepository')
        this.authRepository = container.get('authRepository')
    }

    async signUp(authBody) {
        //Validate username, password
        try {
            const validatation = UserSchema.validateAuthUser(authBody)
            if (!validatation.success) {
                return validatation.error
            }
            //Check user existed
            const user = await userRepository.getUsername(authBody.username);

            if (!user) {
                const userCreated = await authRepository.signUp(authBody)

                return {
                    code: resultCodes.register.success,
                    message: "Sign up successful",
                    user: {
                        id: userCreated.id,
                        username:userCreated.username
                    }
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

    async login(authBody) {
        try{
            const validatation = UserSchema.validateAuthUser(authBody)
            if (!validatation.success) {
                return validatation.error
            }
        }catch(err){

        }
    }
}