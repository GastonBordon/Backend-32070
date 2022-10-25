const express = require("express");
const { Router } = express;
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = JSON.stringify(yargs.argv);

const routerApi = require("./api/api.routes");
const routerUsers = require("./users/users.routes");
const routerRandom = require("./api/apiRandom.routes");
const router = Router();
router
  .get("/", (req, res) => {
    res.render("main", { layouts: "index" });
  })
  .get("/info", (req, res) => {
    const memoryUsage = JSON.stringify(process.memoryUsage());
    res.render("info", { layouts: "index", process, memoryUsage, args });
  })
  .use("/api", routerApi)
  .use("/api/random", routerRandom)
  .use("/", routerUsers);

module.exports = router;
