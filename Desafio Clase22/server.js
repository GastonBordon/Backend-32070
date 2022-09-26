const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const handlebars = require("express-handlebars");
const path = require("path");
const mainRouter = require("./routes/main.js");
const productsContainer = require("./container/Contenedor.js");
const msjsContainer = require("./container/ContenedorMensajes")

const randomData = require("./faker.js");

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const PORT = process.env.PORT || 8080;

const layoutsFolderPath = path.resolve(__dirname, "./views/layouts");
const defaultLayoutPath = path.resolve(__dirname, "./views/layouts/index.hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
});

//* Products Faker *//
app.get('/api/products-test', (req, res) => {  
  res.render("main", {layouts: "index"});
});


io.on("connection", async (socket) => {
  let products = await productsContainer.getAllFile();
  console.log("alguien se conecto");
  //Enviar la info
  socket.emit("productos", products);

  //Escucha los cambios
  socket.on("product", async (data) => {
    await productsContainer.saveInFile(data);
    products = await productsContainer.getAllFile();
    io.sockets.emit("productos", products);
  });
});

io.on("connection", async (socket) => {
  let mensajes = await msjsContainer.getAllFile();
  socket.emit("chat", mensajes);

  socket.on("nuevoMensaje", async (data) => {
    await msjsContainer.saveInFile(data);
    mensajes = await msjsContainer.getAllFile();
    io.sockets.emit("chat", mensajes);
  });
});

io.on('connection', async socket => {
  const data = randomData();
  io.sockets.emit('products', data);
  socket.on('product', async data => {
      io.sockets.emit('products', data);
  })
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(err);
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


