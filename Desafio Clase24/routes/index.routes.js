const express = require("express");
const { Router } = express;
const routerProducts = require("./products/products.routes.js");
const routerSession = require("./session/session.routes.js");

const router = Router();
router.get("/api", (req, res) => {
    console.log(req.session.username)
})
.use("/api/productos", routerProducts)
.use("/api/log", routerSession);


module.exports = router;
