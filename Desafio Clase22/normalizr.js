const normalizr = require("normalizr");
const { normalize, denormalize, schema } = normalizr;
const { msjsContainer } = require("./container/ContenedorMensajes")
const util = require('util');


const print = (obj) => {
    console.log(util.inspect(obj, false, 12, true))
}

const authorSchema = new schema.Entity("authors")

const textSchema = new schema.Entity("text") 

const mensajesSchema = new schema.Entity("mensajes", {
    author: authorSchema
})

const chatSchema = new schema.Entity("chat", {
    chat: [mensajesSchema]
})

const readChat = async() => {
    try {
        let data = await msjsContainer.getAllFile();
        return data

    } catch (error) {
        throw new Error("Error al leer chat")
    }
}

readChat().then((data) => {
const normalizedData = normalize(data, mensajesSchema)
console.log(normalizedData)
// print(normalizedData)
}).catch((error) => {console.log(error)})



// console.log("------------------ Datos Originales --------------------")
// console.log(JSON.stringify(chat).length)

// console.log("------------------ Datos Normalizados ------------------")

// const normalizedData = normalize(chat, chatSchema)
// print(normalizedData)
// console.log(JSON.stringify(normalizedData).length)

// console.log("------------------ Datos Desnormalizados ------------------")
// const denormalizedData = denormalize(normalizedData.result, chatSchema, normalizedData.entities)
// console.log(denormalizedData)
// print(JSON.stringify(denormalizedData).length)


