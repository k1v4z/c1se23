module.exports = class RepositoryContainer {
    constructor() {
        this.repositories = {};
    }

    register(repositoryName, repository) {
        this.repositories[repositoryName] = repository
    }

    get(repositoryName) {
        return this.repositories[repositoryName];
    }
}