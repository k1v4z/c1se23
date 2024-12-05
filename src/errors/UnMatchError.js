module.exports = class UnMatchError extends Error {
    constructor(message) {
        super(message)
        this.name = "Unmatch Error"
    }
}