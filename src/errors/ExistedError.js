module.exports = class ExistedError extends Error {
    constructor(message) {
        super(message)
        this.name = "Invalid Error"
    }
}