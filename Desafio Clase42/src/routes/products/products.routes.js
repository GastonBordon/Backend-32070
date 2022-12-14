const express = require("express");
const { Router } = express;
const authMiddleware = require("../../middlewares/auth/auth.middleware.js");
const router = Router();
const productsController = require("../../controllers/products.controller.js")

router.get("/", authMiddleware, productsController.renderAllProducts);

router.get("/all", productsController.getAllProducts);

router.post("/", productsController.saveProduct);

router.get("/:id", productsController.getProductById);

router.put("/:id", productsController.updateProductById);

router.delete("/:id", productsController.deleteById);

module.exports = router;
