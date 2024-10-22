module.exports = class InvalidError extends Error {
    constructor(message, cause){
        super(message)
        this.name = "Invalid Error"
        this.cause = cause
    }
}