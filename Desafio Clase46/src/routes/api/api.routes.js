const Router = require("koa-router");

const routerFaker = require("../faker/productsFaker.routes");
const routerProducts = require("../products/products.routes");

const router = new Router({
  prefix: "api",
});

router.get("/", (ctx) => {
  let data = "Esta es la ruta /api";
  ctx.body = {
    status: "todo ok",
    data,
  };
});

router.use(routerProducts.routes());
router.use(routerFaker.routes());

module.exports = router;
