require('dotenv').config({ path: '../../.env' });
const resultCodes = require("../constants/http_response/resultCode");
const UserSchema = require("../schemas/UserSchema");

module.exports = class AuthService {
    constructor(authRepository, tokenService, passwordHashingService, userService) {
        this.authRepository = authRepository
        this.tokenService = tokenService
        this.passwordHashingService = passwordHashingService
        this.userService = userService
    }

    async signUp(authBody) {
        //Validate username, password
        try {
            const validatation = UserSchema.validateAuthUser(authBody)
            if (!validatation.success) {
                return validatation.error
            }

            //Check user existed
            const user = await this.userService.getUsername(authBody.username);

            if (!user) {
                var hashPassword = this.passwordHashingService.hashPassword(authBody.password)
                const userCreated = await this.authRepository.signUp(authBody.username, hashPassword)
                return {
                    code: resultCodes.register.success,
                    message: "Sign up successful",
                    user: {
                        id: userCreated.id,
                        username: userCreated.username
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
        try {
            const validatation = UserSchema.validateAuthUser(authBody)
            if (!validatation.success) {
                return validatation.error
            }

            const user = await this.userService.getUsername(authBody.username);
            //If user existed
            if (user) {
                //Hash password
                const { password } = await this.authRepository.getHashPassword(authBody.username)

                if (this.passwordHashingService.compareHashPassword(authBody.password, password)) {
                    const payload = {
                        userId: user.id,
                        username: user.username
                    }

                    // IMPLEMENT LOGIC REFRESH TOKEN LATER
                    // ....
                    const accessToken = this.tokenService.generateAccessToken(payload)

                    return {
                        code: resultCodes.login.success,
                        message: "Login successful",
                        accessToken: accessToken
                    }
                }

                return {
                    code: resultCodes.login.fail,
                    message: "Username or password is correct"
                }
            } else return {
                code: resultCodes.login.userNotExist,
                message: "User don't exist"
            }
        } catch (err) {
            console.log(err);
            return {
                code: resultCodes.login.error,
                message: "Error when processing, try again later"
            }
        }
    }

    logout(token) {
        if (this.tokenService.checkToken(token)) {
            return {
                code: resultCodes.logout.success,
                message: "Logout successfully"
            }
        }

        return {
            code: resultCodes.logout.tokenNotExisted,
            message: "Token don't exist"
        }
    }
}