//Load route
const loadRoute = (app) => {
    console.log("Loading Express Route ...");

    //Loading Auth Route
    const AuthRoute = require("../route/AuthRoute");
    AuthRoute.useRoutes('/api/v1', app)

    //Loading Plan Route
    const PlanRoute = require("../route/PlanRoute");
    PlanRoute.useRoutes('/api/v1', app)

    //Loading Image Route
    const ImageRoute = require("../route/ImageRoute");
    ImageRoute.useRoutes('/api/v1', app)

    const ActivityLocationRoute = require("../route/ActivityLocationRoute");
    ActivityLocationRoute.useRoutes('/api/v1', app)
}

module.exports = loadRoute