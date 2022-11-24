const { logger } = require("../middlewares/logger/logger.pino.js")
const fileContainer = require("../container/Contenedor.js")
const renderMain = async (req, res) => {
  try {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);

    let products = await fileContainer.getAllFile();
    res.render("main", { layouts: "index", products, session: req.session });
  } catch (error) {
    res.send(error);
  }
}

const getProductById = async (req, res) => {
  try {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);

    let productById = await fileContainer.getById(req.params.id);
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
}

const saveProduct = async (req, res) => {
  try {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);

    await fileContainer.saveInFile(req.body);
    res.render("main", { layouts: "index" });
    res.render("layouts/index", { listProducts: false });
  } catch (error) {
    res.send(error);
  }
}

const updateProduct = async (req, res) => {
  try {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);

    let productById = await fileContainer.getById(req.params.id);
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
      await fileContainer.deleteById(req.params.id);
      await fileContainer.saveInFile(productById);
      res.json({
        data: productById,
      });
    }
  } catch (error) {
    res.send(error);
  }
}

const deleteProductById = async (req, res) => {
  try {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);

    await fileContainer.deleteById(req.params.id);
    res.json({
      data: "archivo eliminado con éxito",
    });
  } catch (error) {
    res.send("ERROR");
  }
}


module.exports = { renderMain, getProductById, saveProduct, updateProduct, deleteProductById }