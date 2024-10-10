require('dotenv').config({ path: '../../.env' })
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,   // Your cloud name
    api_key: process.env.API_KEY,         // Your API key
    api_secret: process.env.API_SECRET,   // Your API secret
});

module.exports = cloudinary


