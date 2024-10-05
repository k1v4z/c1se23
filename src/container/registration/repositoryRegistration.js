const repositoryNames = require("../../constants/repository_name/repositoryNames");
const RepositoryContainer = require("../RepositoryContainer");

//init repo container 
const repositoryContainer = new RepositoryContainer()

//User Repo
const UserRepository = require("../../repository/UserRepository");
repositoryContainer.register(repositoryNames.USER_REPOSITORY, new UserRepository())

//Auth Repo
const AuthRepository = require("../../repository/AuthRepository");
repositoryContainer.register(repositoryNames.AUTH_REPOSITORY, new AuthRepository())

module.exports = repositoryContainer