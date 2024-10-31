const acLocationCodes = require("../constants/http_response/acLocationCode");
const ExistedError = require("../errors/ExistedError");
const InvalidError = require("../errors/InvalidError");
const NotFoundError = require("../errors/NotFoundError");
const ActivityLocationSchema = require("../schemas/ActivityLocationSchema");
const PaginationSchema = require("../schemas/PaginationSchema");

module.exports = class ActivityLocationService {
    constructor(activityLocationRepository) {
        this.activityLocationRepository = activityLocationRepository
    }

    async createActivityLocation(data) {
        const validatation = ActivityLocationSchema.validateActivityLocation(data)
        if (!validatation.success) {
            throw new InvalidError("Invalid datatype", validatation.error.errors)
        }

        const { name, address } = data

        //Check activity location existed first
        //If existed -> deny create else allow create
        const existedLocation = await this.getActivityLocationByName(name, address)
        if (existedLocation) {
            throw new ExistedError("Location Existed")
        }

        const newLocation = await this.activityLocationRepository.createActivityLocation(data)
        return newLocation
    }

    async editActivityLocation(id,data) {
        const location = await this.getActivityLocationById(id)

        if (!location) {
            throw new NotFoundError("Location not found")
        }

        //validate later
        const editLocation = this.activityLocationRepository.editActivityLocation(id, data)
        return editLocation
    }

    async getActivityLocation(page, limit, province, type) {
        page = Number(page)
        limit = Number(limit)
        const validation = PaginationSchema.validatePagination({ page, limit })
        if (!validation.success) {
            throw new InvalidError("Page and limit must be a number", validation.error.errors)
        }

        const locations = await this.activityLocationRepository.getActivityLocation(page, limit, province, type)
        return locations
    }

    async getActivityLocationsByProvince(provinceName) {
        try {
            const locations = await this.activityLocationRepository.getActivityLocationsByProvince(provinceName);
            if(!locations){
                throw new NotFoundError("Location not found")
            }
            return locations;
        } catch (err) {
            console.log(err);
            throw new Error("Server Error");
        }
    }

    async getActivityLocationByName(name, address) {
        try {
            const acLocation = await this.activityLocationRepository.getActivityLocationByName(name, address)
            return acLocation
        } catch (err) {
            console.log(err);
        }
    }

    async getActivityLocationById(locationId){
        try{
            const location = await this.activityLocationRepository.getLocationById(locationId)
            return location
        }catch(err){
            throw new Error("Server Error")
        }
    }

    async deleteActivityLocation(locationId) {
        const location = await this.getActivityLocationById(locationId)

        if(!location){
            throw new NotFoundError("Location not found")
        }

        await this.activityLocationRepository.deleteActivityLocation(locationId)
    }
}