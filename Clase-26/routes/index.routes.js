const express = require("express");
const { Router } = express;

const routerApi = require("./api/api.routes")
const routerLogin = require("./login/login.routes");
const routerLogout = require("./logout/logout.routes");

const router = Router();
router
  .get("/api", (req, res) => {
    console.log(req.session.username);
  })
  .use("/api", routerApi)
  .use("/login", routerLogin)
  .use("logout", routerLogout);

module.exports = router;
