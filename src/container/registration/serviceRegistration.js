const ServiceContainer = require("../ServiceContainer");

//init service container
const serviceContainer = new ServiceContainer()

// User Service
const UserService = require("../../service/UserService");
serviceContainer.register('userService', new UserService())

// Auth Service 
const AuthService = require("../../service/AuthService");
serviceContainer.register('authService', new AuthService())

// Token Service 
const TokenService = require("../../service/TokenService");
serviceContainer.register('tokenService', new TokenService())

// Passsword Hashing Service 
const PasswordHashingService = require("../../service/PasswordHashingService");
serviceContainer.register('passwordHashingService', new PasswordHashingService())

module.exports = serviceContainer