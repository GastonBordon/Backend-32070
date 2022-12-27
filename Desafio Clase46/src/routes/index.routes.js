const Router = require("koa-router");
// const yargs = require("yargs/yargs")(process.argv.slice(2));
// const args = JSON.stringify(yargs.argv);
// const compression = require("compression");
const routerApi = require("./api/api.routes")
const routerUsers = require("./users/users.routes");
const routerRandoms = require ("./api/random.routes")

const router = new Router({
  prefix: "/",
});

router.get("/", (ctx) => {
  let data = "Esta es la ruta raiz";
  ctx.body = {
    status: "todo ok",
    data,
  };
});

router.get("info", (ctx) => {
  let data = "Esta es la ruta /info";
  ctx.body = {
    status: "success",
    data,
  };
});

router.use(routerApi.routes())
router.use(routerRandoms.routes())
router.use(routerUsers.routes())

module.exports = router;
