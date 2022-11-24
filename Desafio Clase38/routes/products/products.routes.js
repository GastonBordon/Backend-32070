const express = require("express");
const { Router } = express;
const { renderMain, getProductById, saveProduct, updateProduct, deleteProductById } = require("../../controller/products.controller.js");
const authMiddleware = require("../../middlewares/auth/auth.middleware.js");
const router = Router();


router.get("/", authMiddleware, renderMain );

router.get("/:id", getProductById);

router.post("/", saveProduct );

router.put("/:id", updateProduct );

router.delete("/:id", deleteProductById);


module.exports = router;
