module.exports = class BaseContainer{
    constructor(){
        this.dependencies = {}
    }

    register(key, value){
        this.dependencies[key] = value
    }

    get(key){
        if (!this.dependencies[key]) {
            throw new Error(`Dependencies ${key} not found.`)
        }
        return this.dependencies[key]
    }
}