require('dotenv').config({ path: '../../.env' });
const resultCodes = require("../constants/ResultCode");
const UserSchema = require("../schemas/UserSchema");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const salt = require('../helper/BcryptHelper');
const secretKey = process.env.SERCRET_KEY

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
            const user = await this.userRepository.getUsername(authBody.username);

            if (!user) {
                var hashPassword = bcrypt.hashSync(authBody.password, salt)
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

            const user = await this.userRepository.getUsername(authBody.username);
            //If user existed
            if (user) {
                //Hash password
                const { password } = await this.authRepository.getHashPassword(authBody.username)

                if (bcrypt.compareSync(authBody.password, password)) {
                    const payload = {
                        userId: user.id,
                        username: user.username
                    }
                    const accessToken = this.generateAccessToken(payload)

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

    generateAccessToken(payload) {
        const token = jwt.sign(
            payload,
            secretKey,
            {
                algorithm: "HS256",
                expiresIn: "30m"
            }
        )

        return token
    }
}