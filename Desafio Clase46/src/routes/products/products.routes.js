const Router = require("koa-router");
const productsController = require("../../controllers/products.controller.js");

const router = new Router({
  prefix: "/productos",
});

router.get("/", productsController.getAllProducts);

router.post("/", productsController.saveProduct);

router.get("/:id", productsController.getProductById);

router.put("/:id", productsController.updateProductById);

router.delete("/:id", productsController.deleteById);

module.exports = router;
