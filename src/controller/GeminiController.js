const resultCodes = require("../constants/http_response/resultCode");
const appContainer = require("../container/registration/containerRegistration");
const containerNames = require("../constants/container_name/containerNames");
const serviceNames = require("../constants/service_name/serviceNames");

module.exports = new class GemininiController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.geminiService = serviceContainer.get(serviceNames.GEMINI_SERVICE)
    }

    getSuggestLocation = async(req, res) => {
        try{
            const body = req.body
            const results = await this.geminiService.getSuggestLocation(body)
            
            return res.status(201).json(results)
        }catch(err){
            console.log(err);
            
            return res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }
}