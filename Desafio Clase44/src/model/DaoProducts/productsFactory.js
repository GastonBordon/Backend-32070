const productsDaoFs = require("./productsDaoFs")

class productsFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case 'FILE':
                return new productsDaoFs("./src/DB/fs/products.txt", [])
            // case 'MONGO':
            //     return new NoticiasDBMongoDAO('miBase', 'noticias')
            default:
                return new productsDaoFs()
        }
    }
}   

module.exports = productsFactoryDAO
