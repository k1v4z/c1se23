const planCodes = require("../constants/http_response/planCode")
const InvalidError = require("../errors/InvalidError")
const MainPlanSchema = require("../schemas/MainPlanSchema")
const PaginationSchema = require("../schemas/PaginationSchema")

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

    async editPlan(planData) {
        try {
            const kindName = planData.kind_name
            const [results] = await this.kindService.getKindIdByName(kindName)
            planData.kindId = results.id
            const editedPlan = await this.planRepository.editPlan(planData)
            return editedPlan
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

    async getAllPlans(userId, page, limit) {
        page = Number(page)
        limit = Number(limit)
        const validation = PaginationSchema.validatePagination({ page, limit })
        if (!validation.success) {
            throw new InvalidError("Page and limit must be a number", validation.error.errors)
        }

        const plans = await this.planRepository.getAllPlans(userId, page, limit)

        return plans
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