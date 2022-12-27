// const randomData = require("../../faker/faker");

// const express = require("express");
// const { Router } = express;
const Router = require("koa-router");
const router = new Router({
  prefix: "/products-test",
});

router.get("/", (ctx) => {
  let data = "Esta es la ruta /api/products-test";
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
