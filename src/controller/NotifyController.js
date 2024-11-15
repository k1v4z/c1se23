const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")

module.exports = new class NotifyController{
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.slackService = serviceContainer.get(serviceNames.SLACK_SERVICE)
    }

    sendSlackMessage = async (req, res) => {
        const messageBody = req.body; // channel_Id
        try{
            const response = await this.slackService.sendSlackMessage(messageBody)
            res.status(200).json(response)
        }catch(error){
            console.log(error)
            res.status(500).json({message: error.message})
        }
    }
}