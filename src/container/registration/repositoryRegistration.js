const RepositoryContainer = require("../RepositoryContainer");

//init repo container 
const repositoryContainer = new RepositoryContainer()

//User Repo
const UserRepository = require("../../repository/UserRepository");
repositoryContainer.register('userRepository', new UserRepository())

//Auth Repo
const AuthRepository = require("../../repository/AuthRepository");
repositoryContainer.register('authRepository', new AuthRepository())

module.exports = repositoryContainer