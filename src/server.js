require('dotenv').config();
const express = require('express');
const bootstrap = require('./loader');
const app = express()
const port = process.env.SERVER_PORT

bootstrap(app)

app.listen(port, () => {
    console.log(`http://${process.env.SERVER_HOST}:${port}`);
})