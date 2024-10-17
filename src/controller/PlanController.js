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

    getPlan = async (req, res) => {
        const planId = req.params.planId
        const plans = await this.planService.getPlan(planId)

        if (plans.statusCode == planCodes.get.success) {
            return res.status(200).json(plans)
        } else {
            return res.status(500).json({
                message: "Error when processing, try again later"
            })
        }
    }

    deletePlan = async (req, res) => {
        const planId = req.params.id
        const deletePlan = await this.planService.deletePlan(planId)

        if (deletePlan.statusCode == planCodes.delete.success) {
            return res.status(200).json({
                code: deletePlan.statusCode,
                message: "Delete Plan Successfully"
            })
        } else {
            return res.status(500).json({
                code: deletePlan.statusCode,
                message: "Error when delete plan, try again later"
            })
        }
    }

    editPlan = async (req, res) => {
        const planId = req.params.id
        const planData = req.body

        try {
            await this.planService.editPlan(planId, planData)
            return res.status(200).json({
                message: "update successful "
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error when update plan, try again later"
            })
        }
    }
}