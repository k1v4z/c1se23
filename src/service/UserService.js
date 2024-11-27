module.exports = class UserService{
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    //Get user by username
    async getUsername(username){
        const user = await this.userRepository.getUsername(username)
        return user
    }

    async getUsers(){
        //Authorize later
        const response = await this.userRepository.getUsers()
        return response
    }

    async setLastLoginUser(username){
        const response = await this.userRepository.setLastLoginUser(username)
        return response
    }

    async setStatusUser(username, status){
        const response = await this.userRepository.setStatusUser(username, status)
        return response
    }

    async addUser(user){
        const response = await this.userRepository.addUser(user)
        return response
    }
}