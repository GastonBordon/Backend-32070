const containerFs = require("../../containers/containerFs")

class messagesDaoFs extends containerFs {
    constructor(path, model){
        super(path, model)
    }
}

module.exports = messagesDaoFs;