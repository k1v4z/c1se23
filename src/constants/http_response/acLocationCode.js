const acLocationCodes = {
    create: {
        success: "CREATE-LOCATION-01",
        existed: "CREATE-LOCATION-02",
        invalid: "CREATE-LOCATION-03",
        error: "CREATE-LOCATION-04",
    },
    get: {
        success: "GET-LOCATION-01",
        fail: "GET-LOCATION-02",
        invalid: "GET-LOCATION-03",
        error: "GET-LOCATION-04"
    },
    delete: {
        success: "DEL-LOCATION-01",
        fail: "DEL-LOCATION-02",
        error: "DEL-LOCATION-03"
    },
    update: {
        success: "UP-LOCATION-01",
        fail: "UP-LOCATION-02",
        error: "UP-LOCATION-03"
    }
}

module.exports = acLocationCodes