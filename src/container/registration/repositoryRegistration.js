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

//Province Repo
const ProvinceRepository = require("../../repository/ProvinceRepository");
repositoryContainer.register(repositoryNames.PROVINCE_REPOSITORY, () => {
    return new ProvinceRepository()
})

//Activity Location repo
const ActivityLocationRepository = require("../../repository/ActivityLocationRepository");
repositoryContainer.register(repositoryNames.ACTIVITY_LOCATION_REPOSITORY, () => {
    return new ActivityLocationRepository()
})


//Comment Repo
const CommentRepository = require("../../repository/CommentRepository");
repositoryContainer.register(repositoryNames.COMMENT_REPOSITORY, () => {
    return new CommentRepository()
})

//Post Repo
const PostRepository = require("../../repository/PostRepository")
repositoryContainer.register(repositoryNames.POST_REPOSITORY, () => {
    return new PostRepository()
})

const SlackRepository = require("../../repository/SlackRepository")
repositoryContainer.register(repositoryNames.SLACK_REPOSITORY, () => {
    return new SlackRepository()
})

module.exports = repositoryContainer