const containerNames = require("../constants/container_name/containerNames")
const planCodes = require("../constants/http_response/planCode")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")

module.exports = new class PlanController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.planService = serviceContainer.get(serviceNames.PLAN_SERVICE)
    }

    createPlan = async (req, res) => {
        const planBody = req.body
        
        const newPlan = await this.planService.createPlan(planBody)
        //console.log(newPlan.error);

        if (newPlan.statusCode == planCodes.create.invalid) {
            return res.status(400).json({
                message: "Data invalid",
                err: newPlan.error
            })
        } else if (newPlan.statusCode == planCodes.create.success) {
            return res.status(201).json({
                message: "Create Plan Successful",
                newPlan
            })
        }

        return res.status(500).json({
            message: "Having trouble when processing"
        })
    }
}