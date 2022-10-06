const express = require("express");
const { Router } = express;
const routerProducts = require("./products/products.routes.js");
const routerSession = require("./session/session.routes.js");
const routerRegister = require("./signup/signup.routes");
const router = Router();

router
  .get("/api", (req, res) => {
    console.log(req.session.username);
  })
  .use("/api/productos", routerProducts)
  .use("/api/log", routerSession)
  .use("/api/signup", routerRegister);

module.exports = router;
