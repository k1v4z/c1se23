const containerNames = require("../constants/container_name/containerNames")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")

module.exports = new class ImageController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.imageService = serviceContainer.get(serviceNames.IMAGE_SERVICE)
    }

    upload = async (req, res) => {
        try {
            const files = req.files;

            // Check file uploaded ?
            if (!files || files.length === 0) {
                return res.status(400).send({ message: 'Please upload at least one file.' });
            }

            const results = await this.imageService.uploadImage(files)

            res.status(200).json({
                message: 'Files uploaded and paths saved successfully.',
                imageUrl: results
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error uploading files.' });
        }
    }
}