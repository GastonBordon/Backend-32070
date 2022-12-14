const messagesDaoFs = require("./messagesDaoFs")

class messagesFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case 'FILE':
                return new messagesDaoFs("./src/DB/fs/messages.txt", { id: "mensajes", mensajes: [] })
            // case 'MONGO':
            //     return new NoticiasDBMongoDAO('miBase', 'noticias')
            default:
                return new messagesDaoFs()
        }
    }
}   

module.exports = messagesFactoryDAO
