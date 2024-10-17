const upload = require("../config/multer");
const ImageController = require("../controller/ImageController");
const BaseRoute = require("./BaseRoute");

module.exports = new class ImageRoute extends BaseRoute{
    constructor(){
        super()
    }

    initRoutes(){
        this.router.post('/upload',upload.array('images', 10) ,ImageController.uploadImage)
    }
}