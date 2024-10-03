const RepositoryContainer = require("./RepositoryContainer");

//init container 
const container = new RepositoryContainer()

//User Repo
const UserRepository = require("../repository/UserRepository");
container.register('userRepository', new UserRepository())

//Auth Repo
const AuthRepository = require("../repository/AuthRepository");
container.register('authRepository', new AuthRepository())

module.exports = container  