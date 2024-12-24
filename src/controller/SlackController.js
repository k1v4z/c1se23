const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")

module.exports = new class SlackController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.slackService = serviceContainer.get(serviceNames.SLACK_SERVICE)
    }

    addSlackCredentials = async (req, res) => {
        try {
            const { channelId, accessToken } = req.body
            const slackCredentials = await this.slackService.addSlackCredentials(req.userId,channelId, accessToken)
            res.status(200).send(slackCredentials)
        } catch (error) {
            console.log(error);
            
            res.status(500).send(error)
        }
    }
}