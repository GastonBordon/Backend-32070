const express = require("express");
const path = require("path");
const mainRouter = require("./routes/main.js");
const fileContainer = require("./container/Contenedor.js");

const app = express();
const PORT = process.env.PORT || 8080;

const layoutsFolderPath = path.resolve(__dirname, "./views/layouts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("static", express.static(__dirname + "public"));

app.use("/api", mainRouter);

app.set("views", "./views");

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("layout");
});

app.get("/productos", async (req, res) => {
  let products = await fileContainer.getAllFile();
  res.render("layout", { products, listProducts: true });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
