const express = require('express')

module.exports = class BaseRoute{
    constructor(){
        this.router = express.Router()
        this.initRoutes()
    }

    initRoutes() {
        //Subclass override
    }

    getRoutes(){
        return this.router
    }

    useRoutes(path, app){
        app.use(path, this.getRoutes())
    }
}