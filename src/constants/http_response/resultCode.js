const resultCodes = {
    register: {
        success: "REG01",
        fail: "REG02",
        invalid: "REG03",
        error: "REG04",
        userExisted: "REG05"
    },
    login: {
        success: "LOG01",
        fail: "LOG02",
        invalid: "LOG03",
        error: "LOG04",
        userNotExist: "LOG05"
    },
    logout: {
        success: "LOGOUT01",
        fail: "LOGOUT02",
        tokenNotExisted: "LOGOUT03"
    }
}

module.exports = resultCodes