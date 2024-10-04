const AppContainer = require("../AppContainer");
const appContainer = new AppContainer()

//Service Container
const serviceContainer = require("./serviceRegistration");
appContainer.register('serviceContainer', serviceContainer)

//Repo Container
const repositoryContainer = require("./repositoryRegistration");
appContainer.register('repositoryContainer', repositoryContainer)

module.exports = appContainer
