const planCodes = require("../constants/http_response/planCode")
const MainPlanSchema = require("../schemas/MainPlanSchema")

module.exports = class PlanService {
    constructor(planRepository, kindService, datePlanService, provinceService) {
        this.planRepository = planRepository
        this.kindService = kindService
        this.datePlanService = datePlanService
        this.provinceService = provinceService
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
            // Nếu người dùng add 2 location trùng nhau thì hủy -> implement later
            const { plan } = planBody
            if (!this.datePlanService.validateDateActivities(plan)) {
                return {
                    statusCode: planCodes.create.invalid,
                    error: "Invalid date time plan"
                }
            }

            const kindName = plan.kind_name
            const provinceName = plan.province_name

            const [provinceResult] = await this.provinceService.getProvinceIdByName(provinceName)
            const [results] = await this.kindService.getKindIdByName(kindName) //array destructuring
            plan.kindId = results.id
            plan.provinceId = provinceResult.id

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
            const provinceName = plan.province_name

            const [results] = await this.kindService.getKindIdByName(kindName)
            const [provinceResult] = await this.provinceService.getProvinceIdByName(provinceName)

            //If user change province or date, clear all activitys regarding this plan
            plan.kindId = results.id
            await this.planRepository.editPlan(planId, plan)
        } catch (err) {
            console.log(err);
        }
    }

    async getPlan(planId, userId) {
        try {
            const plans = await this.planRepository.getPlan(planId, userId)
            
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