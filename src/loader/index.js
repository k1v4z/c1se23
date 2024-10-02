const loadExpressConfig = require("./express");
const loadRoute = require("./route")

const bootstrap = (app) => {
    loadExpressConfig(app)
    loadRoute(app)
    console.log("Loading completed");
}

module.exports = bootstrap
