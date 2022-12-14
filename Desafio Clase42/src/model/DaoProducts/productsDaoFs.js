const containerFs = require("../../containers/containerFs")

class productsDaoFs extends containerFs {
    constructor(path, model){
        super(path, model)
    }
}

module.exports = productsDaoFs;