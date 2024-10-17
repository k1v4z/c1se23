const { Readable } = require('stream'); // Convert buffer to stream
const cloudinary = require('../config/cloudinary');

module.exports = class ImageService {
    constructor() {

    }

    uploadStream = (buffer, folderName) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                folder: folderName
            }, (err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })

            const readableStream = new Readable()
            readableStream.push(buffer)
            readableStream.push(null); // Mark end stream
            readableStream.pipe(stream);
        })


    }

    async uploadImage(files, folderName) {
        const uploadResults = await Promise.all(files.map(async (file) => {
            const result = await this.uploadStream(file.buffer, folderName)
            return {
                originalname: file.originalname,
                url: result.secure_url //url of file in cloudinary
            }
        }))

        return uploadResults
    }


}