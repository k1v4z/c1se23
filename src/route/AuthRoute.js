const express = require('express')
const AuthController = require('../controller/AuthController')
const router = express.Router()

const initAuthRoute = (app) => {
    router.post('/sign-up', AuthController.signUp)
    app.use('/api/v1/', router);
}

module.exports = initAuthRoute