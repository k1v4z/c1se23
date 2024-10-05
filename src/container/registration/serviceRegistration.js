const ServiceContainer = require("../ServiceContainer");
const serviceNames = require("../../constants/service_name/serviceNames");

//init service container
const serviceContainer = new ServiceContainer()

// User Service
const UserService = require("../../service/UserService");
serviceContainer.register(serviceNames.USER_SERVICE, new UserService())

// Auth Service 
const AuthService = require("../../service/AuthService");
serviceContainer.register(serviceNames.AUTH_SERVICE, new AuthService())

// Token Service 
const TokenService = require("../../service/TokenService");
serviceContainer.register(serviceNames.TOKEN_SERVICE, new TokenService())

// Passsword Hashing Service 
const PasswordHashingService = require("../../service/PasswordHashingService");
serviceContainer.register(serviceNames.PASSWORD_HASHING_SERVICE, new PasswordHashingService())

module.exports = serviceContainer