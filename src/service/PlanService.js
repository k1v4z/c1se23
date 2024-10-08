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
            console.log(this.datePlanService.validateDateActivities(plan));
            
            if (!this.datePlanService.validateDateActivities(plan)) {
                return {
                    statusCode: planCodes.create.invalid,
                    error: "Invalid date time plan"
                }
            }

            const kindName = plan.kind_name
            const [results] = await this.kindService.getKindIdByName(kindName) //array destructuring
            plan.kindId = results.id
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

}