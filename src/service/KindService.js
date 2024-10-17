module.exports = class KindService{
    constructor(kindRepository){
        this.kindRepository = kindRepository
    }

    async getKindIdByName(kindName){
        const kindId = this.kindRepository.getKindIdByName(kindName)
        return kindId
    }
}