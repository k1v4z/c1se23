module.exports = new class PlanController {
    async createPlan(req, res) {
        return res.status(200).json({
            message: "Create plan"
        })
    }
}