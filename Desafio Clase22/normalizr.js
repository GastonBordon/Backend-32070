const normalizr = require("normalizr");
const { normalize, denormalize, schema } = normalizr;

const util = require('util')

const print = (obj) => {
    console.log(util.inspect(obj, false, 12, true))
}


const blogposts = {
    id: "1",
    title: "My blogpost",
    description: "Short blogpost description",
    content: "Hello world",
    autor: {
        id: "1",
        name: "Jhon Doe"

    },
    comments: [
        {
            id: "1",
            author: "Rob",
            content: "Nice post!"
        },
        {
            id: "2",
            author: "Jane",
            content: "I totally agree with you!"
        }
    ]
}

const authorSchema = new schema.Entity("authors")

const commentsSchema = new schema.Entity("comments")

//esquema para los articulos

const postSchema = new schema.Entity("posts", {
    author: authorSchema,
    comments: [ commentsSchema ]
})

const normalizedBlogpost = normalize(blogposts, postSchema)

console.log(normalizedBlogpost)

print(normalizedBlogpost)


// const denormalizeBlogpost = denormalize(normalizedBlogpost.result, postSchema, normalizedBlogpost.entities)
// console.log(denormalizeBlogpost)


// console.log(JSON.stringify(blogposts).length)
// console.log(JSON.stringify(normalizedBlogpost).length)