require('dotenv').config();

const express = require('express');
const initAuthRoute = require('./route/AuthRoute');
const AuthRoute = require('./route/AuthRoute');
const app = express()
const port = process.env.SERVER_PORT

app.get('/', (req, res) => {
    res.send("Hello");
})

AuthRoute.useRoutes(app)

app.listen(port,() => {
    console.log(`http://${process.env.SERVER_HOST}:${port}`);
})