const AuthRepository = require("../repository/AuthRepository");
const UserRepository = require("../repository/UserRepository");
const RepositoryContainer = require("./RepositoryContainer");

//init container 
const container = new RepositoryContainer()
container.register('userRepository', new UserRepository())
container.register('authRepository', new AuthRepository())

module.exports = container  