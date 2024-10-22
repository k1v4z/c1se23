module.exports = class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = "Resource Not Found Error"
    }
}