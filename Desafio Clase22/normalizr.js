const normalizr = require("normalizr");
const { normalize, denormalize, schema } = normalizr;
const { msjsContainer } = require("./container/ContenedorMensajes")
const util = require('util');


const leerChat = async () => {
    try {
        let data = await msjsContainer.getAllFile();
        return data;

    } catch (error) {
        throw new Error("Error al leer chat")
    }
    
}

const chat = leerChat().then(data => { return data } );
 
    
const print = (obj) => {
    console.log(util.inspect(obj, false, 12, true))
}



// console.log(chat)

const authorSchema = new schema.Entity("authors", {}, {idAttribute: "email"})

const textSchema = new schema.Entity("text", {
    commenter: authorSchema
}) 

//esquema para los articulos

const mensajesSchema = new schema.Entity("mensajes", {
    author: authorSchema,
    mensajes: [ textSchema ]
})

const chatSchema = new schema.Entity("chat", {
    chat: [mensajesSchema]
})



console.log("------------------ Datos Originales --------------------")
console.log(JSON.stringify(chat).length)

console.log("------------------ Datos Normalizados ------------------")

const normalizedData = normalize(chat, chatSchema)
print(normalizedData)
console.log(JSON.stringify(normalizedData).length)

console.log("------------------ Datos Desnormalizados ------------------")
const denormalizedData = denormalize(normalizedData.result, chatSchema, normalizedData.entities)
console.log(denormalizedData)
// print(JSON.stringify(denormalizedData).length)


