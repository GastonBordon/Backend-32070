const productsApi = require("../api/products.api.js");

const productsController = {

getAllProducts : async (ctx) => {
  try {
    let products = await productsApi.getAllFile();
    ctx.response.status = 200
    ctx.body = {
      status: "Success",
      products
    }
  } catch (error) {
    ctx.response.status = 400
    ctx.body = {
      status: "Error",
      error
    }
  }
},
getProductById : async (ctx) => {
    try {
      let productById = await productsApi.getById(ctx.params.id);
      if (!productById) {
       ctx.body = {
          Error: "Producto no Encontrado",
        };
      } else {
        ctx.response.status = 201
        ctx.body = {
          status: "Success",
          data: productById,
        }
      }
    }catch (error) {
      ctx.response.status = 400
      ctx.body = {
        status: "Error",
        error
      }
    }
  },
  saveProduct : async (ctx) => {
    try {
      const product = await productsApi.saveInFile(ctx.request.body);
      ctx.body = {
        status: 201,
        data: product,
      }
    } catch (error) {
      ctx.response.status = 400
      ctx.body = {
        status: "Error",
        error
      }
    }
  },
updateProductById : async (ctx) => {
    try {
      let productById = await productsApi.getById(ctx.params.id);
      if (!productById) {
        ctx.body = {
           Error: "Producto no Encontrado",
         };
      } else {
        let newValues = ctx.request.body;
  
        for (const element in productById) {
          for (const elem in newValues) {
            if (element === elem) {
              productById[element] = newValues[elem];
            }
          }
        }
        await productsApi.deleteById(ctx.params.id);
        await productsApi.saveInFile(productById);

        ctx.body = {
          status: "Success",
          data: productById
        }
        
      }
    } catch (error) {
      ctx.response.status = 400
      ctx.body = {
        status: "Error",
        error
      }
    }
  },
deleteById : async (ctx) => {
    try {
      await productsApi.deleteById(ctx.params.id);
      ctx.body = {
        status: "Success",
        data: "archivo eliminado con éxito",
      }
     
    } catch (error) {
      ctx.response.status = 400
      ctx.body = {
        status: "Error",
        error
      }
    }
  }
}

module.exports = productsController;