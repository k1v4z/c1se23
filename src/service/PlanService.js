const planCodes = require("../constants/http_response/planCode")
const MainPlanSchema = require("../schemas/MainPlanSchema")

module.exports = class PlanService {
    constructor(planRepository, kindService, datePlanService) {
        this.planRepository = planRepository
        this.kindService = kindService
        this.datePlanService = datePlanService
    }

    async createPlan(planBody) {
        try {
            const planValidate = MainPlanSchema.validateMainPlan(planBody)
            if (!planValidate.success) {
                const [err] = planValidate.error.errors
                return {
                    statusCode: planCodes.create.invalid,
                    error: err.message
                }
            }

            const { plan } = planBody
            if (!this.datePlanService.validateDateActivities(plan)) {
                return {
                    statusCode: planCodes.create.invalid,
                    error: "Invalid date time plan"
                }
            }

            const kindName = plan.kind_name
            const [results] = await this.kindService.getKindIdByName(kindName) //array destructuring
            plan.kindId = results.id
            //Pre-process data before send to repository
            plan.activities.map((activity) => {
                activity.activity_thumbs = {
                    create: {
                        image_url: activity.image_url
                    }
                }
                //Delete key image url
                delete activity.image_url
                return activity
            })

            const newPlan = await this.planRepository.createPlan(plan)
            return {
                statusCode: planCodes.create.success,
                planId: newPlan.id
            }
        } catch (err) {
            console.log(err);
            return {
                statusCode: planCodes.create.error,
            }
        }

    }

    async editPlan(planId, planData) {
        try {
            const { plan } = planData
            const kindName = plan.kind_name
            const [results] = await this.kindService.getKindIdByName(kindName)
            plan.kindId = results.id
            await this.planRepository.editPlan(planId, plan)
        } catch (err) {
            console.log(err);
        }
    }

    async getPlan(userId) {
        try {
            const plans = await this.planRepository.getPlan(userId)
            return {
                statusCode: planCodes.get.success,
                plans
            }
        } catch (err) {
            console.log(err);
            return {
                statusCode: planCodes.get.error
            }
        }
    }

    async deletePlan(planId) {
        try {
            //check Plan exist first
            const plan = await this.planRepository.getPlanById(planId)
            if (!plan) {
                return {
                    statusCode: planCodes.delete.fail
                }
            } else {
                //If plan exist delete this
                await this.planRepository.deletePlan(planId)
                return {
                    statusCode: planCodes.delete.success
                }
            }
        } catch (err) {
            console.log(err);

            return {
                statusCode: planCodes.delete.error
            }
        }
    }

}