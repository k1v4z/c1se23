const containerNames = require("../constants/container_name/containerNames")
const acLocationCodes = require("../constants/http_response/acLocationCode")
const serviceNames = require("../constants/service_name/serviceNames")
const appContainer = require("../container/registration/containerRegistration")
const ExistedError = require("../errors/ExistedError")
const InvalidError = require("../errors/InvalidError")
const NotFoundError = require("../errors/NotFoundError")

module.exports = new class ActivityLocationController {
    constructor() {
        const serviceContainer = appContainer.get(containerNames.SERVICE_CONTAINER)
        this.activityLocationService = serviceContainer.get(serviceNames.ACTIVITY_LOCATION_SERVICE)
    }

    //Validate first then get type Id
    createActivityLocation = async (req, res) => {
        const acLocationData = req.body
        try {
            const result = await this.activityLocationService.createActivityLocation(acLocationData)
            return res.status(201).json({
                code: acLocationCodes.create.success,
                newLocation: result
            })
        } catch (err) {
            if (err instanceof InvalidError) {
                return res.status(400).json({
                    code: acLocationCodes.create.invalid,
                    message: err.message,
                    cause: err.cause
                })
            }

            if (err instanceof ExistedError) {
                return res.status(409).json({
                    code: acLocationCodes.create.existed,
                    message: err.message,
                })
            }

            console.log(err);

            return res.status(500).json({
                code: acLocationCodes.create.error,
                message: "Error when create"
            })
        }
    }

    editActivityLocation = async (req, res) => {
        const id = req.params.id
        const data = req.body

        try {
            const editLocation = await this.activityLocationService.editActivityLocation(id, data)
            return res.status(200).json({
                message: "Edit successful",
                editLocation
            })
        } catch (err) {
            if (err instanceof NotFoundError) {
                return res.status(400).json({
                    message: err.message
                })
            }

            console.log(err);
            
            return res.status(500).json({
                message: "error when edit"
            })
        }
    }

    getActivityLocation = async (req, res) => {
        const { page, limit, province, type } = req.query
        try {
            const results = await this.activityLocationService.getActivityLocation(page, limit, province, type)
            return res.status(200).json({
                code: acLocationCodes.get.success,
                results
            })
        } catch (err) {
            if (err instanceof InvalidError) {
                return res.status(400).json({
                    code: acLocationCodes.get.invalid,
                    message: err.message,
                    cause: err.cause
                })
            }

            console.log(err);

            return res.status(500).json({
                code: acLocationCodes.get.error,
                message: "Error when processing, try again later"
            })
        }
    }

    deleteActivityLocation = async (req, res) => {
        const locationId = req.params.id
        try {
            await this.activityLocationService.deleteActivityLocation(locationId)
            return res.status(200).json({
                code: acLocationCodes.delete.success,
                message: "Delete Successfully"
            })
        } catch (err) {
            if (err instanceof NotFoundError) {
                return res.status(404).json({
                    code: acLocationCodes.delete.fail,
                    message: err.message
                })
            }
            console.log(err);

            return res.status(500).json({
                code: acLocationCodes.delete.error,
                message: "Error when delete"
            })
        }
    }
}