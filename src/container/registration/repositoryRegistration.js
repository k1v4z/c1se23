const repositoryNames = require("../../constants/repository_name/repositoryNames");
const RepositoryContainer = require("../RepositoryContainer");

//init repo container 
const repositoryContainer = new RepositoryContainer()

//User Repo
const UserRepository = require("../../repository/UserRepository");
repositoryContainer.register(repositoryNames.USER_REPOSITORY, () => {
    return new UserRepository()
})

//Auth Repo
const AuthRepository = require("../../repository/AuthRepository");
repositoryContainer.register(repositoryNames.AUTH_REPOSITORY, () => {
    return new AuthRepository()
})

//Plan Repo
const PlanRepository = require("../../repository/PlanRepository");
repositoryContainer.register(repositoryNames.PLAN_REPOSITORY, () => {
    return new PlanRepository()
})

//Kind Repo
const KindRepository = require("../../repository/KindRepository");
repositoryContainer.register(repositoryNames.KIND_REPOSITORY, () => {
    return new KindRepository()
})

module.exports = repositoryContainer