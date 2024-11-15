const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")

module.exports = new class RecommendationController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.geminiService = serviceContainer.get(serviceNames.GEMINI_SERVICE)
    }
}