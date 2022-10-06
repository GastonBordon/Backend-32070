const express = require("express");
require('dotenv').config()
const app = express();
const logger = require('morgan')
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//* ---------------------------------- */
//* -------- Configuracion HBS ------- */
//* ---------------------------------- */

const path = require("path");
const handlebars = require("express-handlebars");
const layoutsFolderPath = path.resolve(__dirname, "./views/layouts");
const defaultLayoutPath = path.resolve(__dirname, "./views/layouts/index.hbs");

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

//* ---------------------------------- */
//* ------------ Session ------------- */
//* ---------------------------------- */

const session = require("express-session")

//* ------- Mongo ---------*/
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser:true, useUnifiedTopology: true}
 
app.use(logger('dev'))

app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    rolling:true,
    saveUninitialized: true,
    store:MongoStore.create({
        mongoUrl:`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`,
    mongoOptions: advancedOptions
    }),
    cookie:{
      maxAge:10000
    }
}))

app.use(cookieParser(process.env.COOKIES_SECRET || '123456'))

//* ---------------------------------- */
//* ------------- Rutas -------------- */
//* ---------------------------------- */

const mainRouter = require("./routes/index.routes.js");

app.use("/", mainRouter);

app.get("/", (req, res) => {
    res.render("main", { layouts: "index"});
});

//* Ruta Products Faker *//
const randomData = require("./faker.js");

app.get('/api/products-test', (req, res) => {  
  const data = randomData();
  res.render("test", {layouts: "index", data});
});


//* ---------------------------------- */
//* ----------- Web SOCKET ----------- */
//* ---------------------------------- */


const { Server: SocketServer } = require("socket.io");
const io = new SocketServer(httpServer);
const productsContainer = require("./container/Contenedor.js");
const msjsContainer = require("./container/ContenedorMensajes.js")
const normalize = require ("./normalizr.js")

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
  let data = await msjsContainer.readFile();
  data = await normalize.dataNormalizer(data)
  socket.emit("chat", data);


  socket.on("nuevoMensaje", async (data) => {
    await msjsContainer.saveInFile(data);
    mensajes = await msjsContainer.getAllFile();
    io.sockets.emit("chat", mensajes);
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(err);
});



httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


