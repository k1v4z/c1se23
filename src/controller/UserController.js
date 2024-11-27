const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")

module.exports = new class UserController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.userService = serviceContainer.get(serviceNames.USER_SERVICE)
    }

    addUser = async (req, res) => {
        const user = req.body
        const response = await this.userService.addUser(user)
        res.status(response.status).send(response)
    }

    getUsers = async (req, res) => {
        const users = await this.userService.getUsers()
        return res.status(200).json({ message: "Users fetched successfully", users })
    }
}