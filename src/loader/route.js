
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

    //Loading Activity Location Route
    const ActivityLocationRoute = require("../route/ActivityLocationRoute");
    ActivityLocationRoute.useRoutes('/api/v1', app)

    //Loading Province Route
    const ProvinceRoute = require("../route/ProvinceRoute");
    ProvinceRoute.useRoutes('/api/v1', app)

    const NotificationRoute = require("../route/NotificationRoute");
    NotificationRoute.useRoutes('/api/v1', app)

    const GeminiRoute = require("../route/GeminiRoute");
    GeminiRoute.useRoutes('/api/v1', app)

    const UserRoute = require("../route/UserRoute");
    UserRoute.useRoutes('/api/v1', app)

    const PostRoute = require("../route/PostRoute");
    PostRoute.useRoutes('/api/v1', app)

    const CommentRoute = require("../route/CommentRoute");
    CommentRoute.useRoutes('/api/v1', app)

    const SlackRoute = require("../route/SlackRoute");
    SlackRoute.useRoutes('/api/v1', app)
}

module.exports = loadRoute