const express = require("express");
const { Router } = express;
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = JSON.stringify(yargs.argv)
const compression = require('compression')


const routerApi = require("./api/api.routes")
const routerUsers = require("./users/users.routes");
const routerRandoms = require ("./api/random.routes")

const router = Router();

router
.get("/", (req, res) => {
  res.render("main", { layouts: "index"});
})
.get("/info",compression(),(req,res)=>{
  const numCPUs = require('os').cpus().length;
  const memoryUsage = JSON.stringify(process.memoryUsage())
  res.render("info",{layouts:"index", process, memoryUsage, args, numCPUs})
})
.use("/api", routerApi)
.use("/api/randoms", routerRandoms)
.use("/", routerUsers)


module.exports = router;
