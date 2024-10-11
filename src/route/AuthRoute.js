const AuthController = require('../controller/AuthController')
const BaseRoute = require('./BaseRoute')

module.exports = new class AuthRoute extends BaseRoute {
    constructor() {
        super()
    }

    initRoutes() {
        this.router.post('/sign-up', AuthController.signUp)
        this.router.post('/login', AuthController.login)
        this.router.post('/logout', AuthController.logout)
        this.router.get('/check-token', AuthController.checkTokenInCookie)
    }

}   