const planCodes = {
    create: {
        success: "CREATE-PLAN-01",
        fail: "CREATE-PLAN-02",
        invalid: "CREATE-PLAN-03",
        error: "CREATE-PLAN-04",
    },
    get: {
        success: "GET-PLAN-01",
        fail: "GET-PLAN-02",
        error: "GET-PLAN-03"
    },
    delete: {
        success: "DEL-PLAN-01",
        fail: "DEL-PLAN-02",
        error: "DEL-PLAN-03"
    },
    update: {
        success: "UP-PLAN-01",
        fail: "UP-PLAN-02",
        error: "UP-PLAN-03"
    }
}

module.exports = planCodes