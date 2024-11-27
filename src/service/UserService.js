const NotFoundError = require("../errors/NotFoundError")

module.exports = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    //Get user by username
    async getUsername(username) {
        const user = await this.userRepository.getUsername(username)
        if(!user) {
            throw new NotFoundError("User not found") 
        }else{
            return user
        }
    }

    async getUsers() {
        //Authorize later
        const response = await this.userRepository.getUsers()
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
        const response = await this.userRepository.addUser(user)
        return response
    }

    async deleteUser(username) {
        const response = await this.userRepository.deleteUser(username)
        return response
    }
}