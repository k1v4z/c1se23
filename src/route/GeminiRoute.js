const GeminiController = require('../controller/GeminiController')
const BaseRoute = require('./BaseRoute')

module.exports = new class GeminiRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.post('/suggest-location', GeminiController.getSuggestLocation)
    }
}   