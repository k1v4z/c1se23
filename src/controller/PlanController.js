const containerNames = require("../constants/container_name/containerNames")
const planCodes = require("../constants/http_response/planCode")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")
const InvalidError = require("../errors/InvalidError")
const NotFoundError = require("../errors/NotFoundError")

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
        //This service get plan include all activities
        const planId = req.params.id
        const userId = req.userId //get UserId from auth middleware

        const plans = await this.planService.getPlan(planId, userId)

        if (plans.statusCode == planCodes.get.success) {
            return res.status(200).json(plans)
        } else {
            return res.status(500).json({
                message: "Error when processing, try again later"
            })
        }
    }

    getAllPlans = async (req, res) => {
        const userId = req.userId
        const { page, limit } = req.query

        try {
            const plans = await this.planService.getAllPlans(userId, page, limit)
            return res.status(200).json({
                code: planCodes.get.success,
                plans
            })
        } catch (err) {
            if (err instanceof InvalidError) {
                return res.status(400).json({
                    code: planCodes.get.fail,
                    message: err.message,
                    cause: err.cause
                })
            }

            console.log(err);

            return res.status(500).json({
                code: planCodes.get.error,
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
        const { planEditData } = req.body
        const planId = req.params.id
        console.log(planEditData);
        planEditData.id = planId

        planEditData.user_id = req.userId

        try {
            await this.planService.editPlan(planEditData)
            return res.status(200).json({
                message: "Update successful "
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error when update plan, try again later"
            })
        }
    }

    addActivityLocationsToPlan = async (req, res) => {
        const planId = req.params.id;
        const activityLocations = req.body.activityLocations;

        const result = await this.planService.addActivityLocationsToPlan(planId, activityLocations);

        if (result.statusCode === planCodes.update.success) {
            return res.status(200).json({
                message: "Activity locations added successfully",
                updatedPlan: result.updatedPlan
            });
        } else {
            return res.status(500).json({
                message: result.message
            });
        }
    }

    removeActivityFromPlan = async (req, res) => {
        try{
            const planId = req.params.id;
            const activityId = req.body.activityId;

            const result = await this.planService.removeActivityFromPlan(planId, activityId);
            
            return res.status(200).json({
                code: planCodes.update.success,
                message: "Activity removed successfully",
                updatedPlan: result.updatedPlan
            });

        }catch(err){
            if(err instanceof NotFoundError){
                return res.status(404).json({
                    code: planCodes.update.fail,
                    message: err.message
                });
            }

            return res.status(500).json({
                code: planCodes.update.error,
                message: "Error when removing activity from plan"
            });
        }
    }
}