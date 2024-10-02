const AuthRoute = require("../route/AuthRoute");

//Load route
const loadRoute = (app) => {
    console.log("Loading Express Route ...");
    //Loading Auth Route
    AuthRoute.useRoutes(app)
}

module.exports = loadRoute