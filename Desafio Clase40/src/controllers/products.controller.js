const productsApi = require("../api/products.api.js");

const productsController = {
renderAllProducts : async (req, res) => {
    try {
      let products = await productsApi.getAllFile();
      res.render("main", { layouts: "index", products, session: req.session })
    } catch (error) {
      res.send(error);
    }
},
getProductById : async (req, res) => {
    try {
      let productById = await productsApi.getById(req.params.id);
      if (!productById) {
        res.json({
          Error: "Producto no Encontrado",
        });
      } else {
        res.json({
          data: productById,
        });
      }
    } catch (error) {
      res.send(error);
    }
  },
  saveProduct : async (req, res) => {
    try {
      await productsApi.saveInFile(req.body);
      res.render("main", { layouts: "index" });
      res.render("layouts/index", { listProducts: false });
    } catch (error) {
      res.send(error);
    }
  },
updateProductById : async (req, res) => {
    try {
      let productById = await productsApi.getById(req.params.id);
      if (!productById) {
        res.json({
          Error: "Producto no Encontrado",
        });
      } else {
        let newValues = req.body;
  
        for (const element in productById) {
          for (const elem in newValues) {
            if (element === elem) {
              productById[element] = newValues[elem];
            }
          }
        }
        await productsApi.deleteById(req.params.id);
        await productsApi.saveInFile(productById);
        res.json({
          data: productById,
        });
      }
    } catch (error) {
      res.send(error);
    }
  },
deleteById : async (req, res) => {
    try {
      await productsApi.deleteById(req.params.id);
      res.json({
        data: "archivo eliminado con éxito",
      });
    } catch (error) {
      res.send("ERROR");
    }
  }
}

module.exports = productsController;