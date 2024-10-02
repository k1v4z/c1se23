require('dotenv').config({ path: '../../.env' });
var cookieParser = require('cookie-parser');
const express = require('express');

// Load config express framework
const loadExpressConfig = (app) => {
    console.log("Loading Express config ...");
    app.use(cookieParser(process.env.COOKIE_SIGNED));
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

module.exports = loadExpressConfig