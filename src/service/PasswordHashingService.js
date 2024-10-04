var bcrypt = require('bcryptjs');
const salt = require('../helper/BcryptHelper');

module.exports = class PassswordHashingService {
    constructor(container) {

    }

    hashPassword(password) {
        return bcrypt.hashSync(password, salt);
    }

    
    compareHashPassword(plainPassword, hashPassword) {
        // result return true or false
        return bcrypt.compareSync(plainPassword, hashPassword)
    }
}