const AppContainer = require("../AppContainer");
const containerNames = require("../../constants/container_name/containerNames");
const appContainer = new AppContainer()

//Service Container
const serviceContainer = require("./serviceRegistration");
appContainer.register(containerNames.SERVICE_CONTAINER, serviceContainer)

//Repo Container
const repositoryContainer = require("./repositoryRegistration");
appContainer.register(containerNames.REPOSITORY_CONTAINER, repositoryContainer)

module.exports = appContainer
