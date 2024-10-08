module.exports = class UserService{
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    //Get user by username
    async getUsername(username){
        const user = await this.userRepository.getUsername(username)
        return user
    }
}