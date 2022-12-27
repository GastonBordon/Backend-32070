const randomData = require("../../faker/faker");

const Router = require("koa-router");
const router = new Router({
  prefix: "/products-test",
});

router.get("/", (ctx) => {
  const data = randomData();
  ctx.body = {
    status: "todo ok",
    data,
  };
});



// router.get("/", (req, res) => {
//   const data = randomData();
//   res.render("test", { layouts: "index", data });
// });

module.exports = router;
