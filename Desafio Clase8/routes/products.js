const express = require("express");
const { Router } = express;
const fileContainer = require("../container/Contenedor.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let products = await fileContainer.getAllFile();
    res.json({
      data: products,
    });
  } catch (error) {
    res.send("ERROR");
  }
});

router.get("/:id", async (req, res) => {
  try {
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
    res.send("ERROR");
  }
});

router.post("/", async (req, res) => {
  try {
    let addProductId = await fileContainer.saveInFile(req.body);
    let addProductWithId = await fileContainer.getById(addProductId);
    res.json({
      data: addProductWithId,
    });
  } catch (error) {
    res.send("ERROR");
  }
});

router.put("/:id", async (req, res) => {
  // try {
  console.log("hola");
  // let productById = await fileContainer.getById(JSON.parse(req.params.id));
  console.log(await fileContainer.getById(JSON.parse(req.params.id)));
  console.log(productById);
  // if (!productById) {
  //   res.json({
  //     Error: "Producto no Encontrado",
  //   });
  // } else {
  //   let newValues = req.body;

  //   for (const element in productById) {
  //     for (const elem in newValues) {
  //       if (element === elem) {
  //         productById[element] = newValues[elem];
  //         console.log(productById);
  //       }
  //     }
  //   }
  //   await fileContainer.deleteById(req.params.id);
  //   await fileContainer.saveInFile(productById);
  //   res.json({
  //     data: productById,
  //   });
  // }
  // } catch (error) {
  //   res.send(error);
  // }
});

router.delete("/:id", async (req, res) => {
  try {
    await fileContainer.deleteById(req.params.id);
    res.json({
      data: "archivo eliminado con éxito",
    });
  } catch (error) {
    res.send("ERROR");
  }
});
module.exports = router;
