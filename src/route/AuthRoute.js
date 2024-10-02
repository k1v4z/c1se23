const express = require('express')
const AuthController = require('../controller/AuthController')

module.exports = new class AuthRoute {
    constructor() {
        this.router = express.Router()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/sign-up', AuthController.signUp)
        this.router.post('/login', AuthController.login)
    }

    getRoutes() {
        return this.router
    }

    useRoutes(app) {
        app.use('/api/v1', this.getRoutes())
    }
}   