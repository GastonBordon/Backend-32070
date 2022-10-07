const express = require("express");
const { Router } = express;

const routerApi = require("./api/api.routes")
const routerUsers = require("./users/users.routes");

const router = Router();
router.get("/", (req, res) => {
  res.render("main", { layouts: "index"});
})
  .use("/api", routerApi)
  .use("/", routerUsers)


module.exports = router;
