const express = require('express');
const initAuthRoute = require('./route/AuthRoute');
const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send("Hello");
})

initAuthRoute(app)

app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})