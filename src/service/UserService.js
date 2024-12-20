const NotFoundError = require("../errors/NotFoundError")
const UnMatchError = require("../errors/UnMatchError")

module.exports = class UserService {
    constructor(userRepository, passwordHashingService) {
        this.userRepository = userRepository
        this.passwordHashingService = passwordHashingService
    }

    //Get user by username
    async getUsername(username) {
        const user = await this.userRepository.getUsername(username)
        if (!user) {
            // throw new NotFoundError("User not found")
            return null;
        } else {
            return user
        }
    }

    async getUsers(page, pageSize) {
        //Authorize later
        const response = await this.userRepository.getUsers(page, pageSize)
        return response
    }

    async setLastLoginUser(username) {
        const response = await this.userRepository.setLastLoginUser(username)
        return response
    }

    async setStatusUser(username, status) {
        const response = await this.userRepository.setStatusUser(username, status)
        return response
    }

    async addUser(user) {
        const hashPassword = await this.passwordHashingService.hashPassword(user.password);
        user.password = hashPassword
        user.role = user.role || 'Tourist';
        const response = await this.userRepository.addUser(user)
        return response
    }

    async deleteUser(username) {
        const response = await this.userRepository.deleteUser(username)
        return response
    }

    async changePassword(username, oldPassword, newPassword) {
        const user = await this.userRepository.getUsername(username);
        if (!user) {
            throw new NotFoundError("User not found")
        }
        const isPasswordMatch = await this.passwordHashingService.compareHashPassword(oldPassword, user.password);
        if (!isPasswordMatch) {
            throw new UnMatchError("Old password is incorrect")
        } else {
            const hashPassword = await this.passwordHashingService.hashPassword(newPassword);
            const response = await this.userRepository.changePassword(username, hashPassword);
            return response
        }
    }

    async addSlackbot(username, channelId, accessToken) {
        const response = await this.userRepository.addSlackbot(username, channelId, accessToken);
        return response
    }

    async setUserRole(username, newRole) {
        const response = await this.userRepository.setUserRole(username, newRole);
        return response;
    }
}