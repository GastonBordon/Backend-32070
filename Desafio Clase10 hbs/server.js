const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const mainRouter = require("./routes/main.js");
const fileContainer = require("./container/Contenedor.js");

const app = express();
const PORT = process.env.PORT || 8080;

const layoutsFolderPath = path.resolve(__dirname, "./views/layouts");
const defaultLayoutPath = path.resolve(__dirname, "./views/layouts/index.hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("static", express.static(__dirname + "public"));

app.use("/api", mainRouter);

app.set("views", "./views");

app.set("view engine", "hbs");

app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: layoutsFolderPath,
    extname: ".hbs",
    defaultLayout: defaultLayoutPath,
  })
);

app.get("/", (req, res) => {
  res.render("main", { layouts: "index" });
  res.render("layouts/index", { listProducts: false });
});

app.get("/productos", async (req, res) => {
  let products = await fileContainer.getAllFile();

  res.render("main", { products, listProducts: true });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
