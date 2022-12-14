// GraphQl //
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const { getAllFile, getById, saveInFile, updateById, deleteById } = require('./graphql.methods.js')

const productSchema = buildSchema(
    `
    type Product {
        title: String,
        price: Float,
        thumbnail: String,
        id: ID!
    }
    input ProductInput {
        title: String,
        price: Float,
        thumbnail: String,
    }
    type Query {
        getById(id: ID!): Product,
        getAllFile(campo: String, valor: String): [Product],
    }
    type Mutation {
        saveInFile(datos: ProductInput): Product,
        updateById(id: ID!, datos: ProductInput): Product,
        deleteById(id: ID!): Product,
    }
    `
)

const configGraphql = graphqlHTTP({
schema: productSchema, 
rootValue: {
    getAllFile,
    getById,
    saveInFile,
    updateById,
    deleteById
}, 
graphiql:true,
})

module.exports = configGraphql