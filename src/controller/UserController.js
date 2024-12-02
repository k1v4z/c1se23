const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")
const NotFoundError = require("../errors/NotFoundError")

module.exports = new class UserController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.userService = serviceContainer.get(serviceNames.USER_SERVICE)
    }

    addUser = async (req, res) => {
        const user = req.body
        const response = await this.userService.addUser(user)
        return res.status(201).json({ message: "User added successfully", user: response })
    }

    getUsers = async (req, res) => {
        const { page, pageSize } = req.query
        console.log(page, pageSize);
        
        const users = await this.userService.getUsers(page, pageSize)
        return res.status(200).json({ message: "Users fetched successfully", users })
    }

    deleteUser = async (req, res) => {
        const username = req.params.username
        const response = await this.userService.deleteUser(username)
        return res.status(200).json({ message: "User deleted successfully", user: response })
    }

    seacrhUser = async (req, res) => {
        const username = req.params.username
        try{
            const user = await this.userService.getUsername(username)
            
            return res.status(200).json({ message: "User fetched successfully", user })
        }catch(err){
            if(err instanceof NotFoundError){
                return res.status(404).json({ message: "User not found" })
            }

            return res.status(500).json({ message: "Internal server error" })
        }
    }

    setStatus = async (req, res) => {
        const username = req.params.username
        const status = req.body.status
        try{
            const response = await this.userService.setStatusUser(username, status)
            return res.status(200).json({ message: "User status updated successfully", user: response })
        }catch(err){
            return res.status(500).json({ message: "Internal server error" })
        }
        
    }


}