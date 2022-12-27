// const express = require("express");
const Router = require("koa-router");
// const authMiddleware = require("../../middlewares/auth/auth.middleware.js");
// const productsController = require("../../controllers/products.controller.js");

const router = new Router({
  prefix: "/productos",
});

router.get("/", (ctx) => {
  let data = "Esta es la ruta /api/productos";
  ctx.body = {
    status: "todo ok",
    data,
  };
});

// router.get("/", productsController.renderAllProducts);

// router.get("/all", productsController.getAllProducts);

// router.post("/", productsController.saveProduct);

// router.get("/:id", productsController.getProductById);

// router.put("/:id", productsController.updateProductById);

// router.delete("/:id", productsController.deleteById);

module.exports = router;
