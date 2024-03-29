const normalizr = require("normalizr");
const {
    normalize,
    denormalize,
    schema
} = normalizr;

class Normalize {
    constructor() {
        this.authorSchema = new schema.Entity("authors", {}, {
            idAttribute: "email"
        })

        this.mensajeSchema = new schema.Entity("mensaje", {
            author: this.authorSchema
        })

        this.chatSchema = new schema.Entity("chat", {
            mensajes: [this.mensajeSchema]
        })
    }

    async dataNormalizer(data) {
        try {
            let normalizedData = normalize(data, this.chatSchema)
            return normalizedData
        } catch (error) {
            throw new Error("Error al leer chat")
        }
    }

    dataDenormalizer(data) {
        try {
            const denormalizedData = denormalize(data.result, this.chatSchema, data.entities)
            return denormalizedData
        } catch (error) {
            throw new Error("Error al leer chat")
        }
    }
}

const normalizeData = new Normalize();

module.exports = normalizeData