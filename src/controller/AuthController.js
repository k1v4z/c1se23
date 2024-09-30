module.exports = new class AuthController {
    signUp(req, res){
        res.status(200).json({
            message: "Test Auth Controller"
        })
    }
}