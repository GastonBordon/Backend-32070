const normalizr = require("normalizr");
const { normalize, denormalize, schema } = normalizr;
const { msjsContainer } = require("./container/ContenedorMensajes")


const readChat = async() => {
    try {
        let data = await msjsContainer.readFile();
        return data

    } catch (error) {
        throw new Error("Error al leer chat")
    }
}

const authorSchema = new schema.Entity("authors", {}, {idAttribute: "email"})

const mensajeSchema = new schema.Entity("mensaje", {
    author: authorSchema
})

const chatSchema = new schema.Entity("chat", {
    mensajes: [ mensajeSchema ]
})


const normalizedData = async() => {
    try {
        const data = await readChat()
        const normalizedData = normalize(data, chatSchema)
        return normalizedData
        }
         catch (error) {
        throw new Error("Error al leer chat")
    }
}

module.exports = normalizedData
