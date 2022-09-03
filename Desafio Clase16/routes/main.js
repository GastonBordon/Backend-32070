const express = require("express");
const { Router } = express;
const routerProducts = require("./products.js");

const router = Router();

router.use("/productos", routerProducts);

module.exports = router;
