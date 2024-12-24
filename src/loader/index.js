const startCron = require("./cron");
const loadExpressConfig = require("./express");
const loadRoute = require("./route")

const bootstrap = (app) => {
    loadExpressConfig(app)
    loadRoute(app)
    startCron()
    console.log("Loading completed");
}

module.exports = bootstrap
