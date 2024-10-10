const ServiceContainer = require("../ServiceContainer");
const serviceNames = require("../../constants/service_name/serviceNames");
const repositoryContainer = require("./repositoryRegistration");
const repositoryNames = require("../../constants/repository_name/repositoryNames");

//init service container
const serviceContainer = new ServiceContainer()

// User Service
const UserService = require("../../service/UserService");
serviceContainer.register(serviceNames.USER_SERVICE, () => {
    const userRepository = repositoryContainer.get(repositoryNames.USER_REPOSITORY)
    return new UserService(userRepository) //inject
})

// Token Service 
const TokenService = require("../../service/TokenService");
serviceContainer.register(serviceNames.TOKEN_SERVICE, () => {
    return new TokenService()
})

//Date Plan Service
const DatePlanService = require("../../service/DatePlanService");
serviceContainer.register(serviceNames.DATE_PLAN_SERVICE, () => {
    return new DatePlanService()
})

// Passsword Hashing Service 
const PasswordHashingService = require("../../service/PasswordHashingService");
serviceContainer.register(serviceNames.PASSWORD_HASHING_SERVICE, () => {
    return new PasswordHashingService()
})

// Auth Service 
const AuthService = require("../../service/AuthService");
serviceContainer.register(serviceNames.AUTH_SERVICE, (container) => {
    const authRepository = repositoryContainer.get(repositoryNames.AUTH_REPOSITORY)
    const userService = container.get(serviceNames.USER_SERVICE)
    const tokenService = container.get(serviceNames.TOKEN_SERVICE)
    const passwordHashingService = container.get(serviceNames.PASSWORD_HASHING_SERVICE)
    return new AuthService(authRepository, tokenService, passwordHashingService, userService) //Inject
})

//Kind Service
const KindService = require("../../service/KindService");
serviceContainer.register(serviceNames.KIND_SERVICE, () => {
    const kindRepository = repositoryContainer.get(repositoryNames.KIND_REPOSITORY)
    return new KindService(kindRepository) //Inject kind repository
})

//Plan Service
const PlanService = require("../../service/PlanService");
serviceContainer.register(serviceNames.PLAN_SERVICE, (container) => {
    const planRepository = repositoryContainer.get(repositoryNames.PLAN_REPOSITORY)
    const kindService = serviceContainer.get(serviceNames.KIND_SERVICE)
    const datePlanService = container.get(serviceNames.DATE_PLAN_SERVICE)
    return new PlanService(planRepository, kindService, datePlanService) //inject plan repo and kind service
})

//Plan service
const ImageService = require("../../service/ImageService");
serviceContainer.register(serviceNames.IMAGE_SERVICE, (container) => {
    return new ImageService()
})

module.exports = serviceContainer