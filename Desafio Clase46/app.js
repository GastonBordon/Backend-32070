const Koa = require("koa");
const { koaBody } = require("koa-body");
// const mainRouter = require("./src/routes/index.routes");
const mainRouter = require("./src/routes/index.routes");
const app = new Koa();

app.use(koaBody());
app.use(mainRouter.routes());

const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});

// Copia del otro desafio

// const express = require("express");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const session = require("express-session");
// require("dotenv").config();
// // const logger = require('pino')()
// // logger.level = 'info'
// let theHTTPLog = logger({
//   "format": "dev",
// });

// const passport = require("./src/middlewares/passport/passport.middleware");

// const MongoStore = require("connect-mongo");
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// // const app = express();
// app.use(theHTTPLog)
// //* Handlebars */

// const handlebars = require("express-handlebars");
// const path = require("path");
// const layoutsFolderPath = path.resolve(__dirname, "./src/views/layouts");
// const defaultLayoutPath = path.resolve(
//   __dirname,
//   "./src/views/layouts/index.hbs"
// );


// // app.set("views", "./src/views");
// // app.set("view engine", "hbs");

// // app.engine(
// //   "hbs",
// //   handlebars.engine({
// //     layoutsDir: layoutsFolderPath,
// //     extname: ".hbs",
// //     defaultLayout: defaultLayoutPath,
// //   })
// // );

// // app.use(logger("dev"));

// app.use(cookieParser(process.env.COOKIES_SECRET || "123456"));

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(express.static("src/public"));

// //*    INICIALIZO SESION CON MONGO ATLAS    *//

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "123456",
//     resave: true,
//     rolling: true,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`,
//       mongoOptions: advancedOptions,
//     }),
//     cookie: {
//       httpOnly: true,
//       secure: false,
//       maxAge: 15000,
//     },
//   })
// );

// //* ------     INICIALIZO PASSPORT EN LA APP    ------- *//.

// app.use(passport.initialize());
// app.use(passport.session());

// // app.use("/", mainRouter);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.send(err);
// });

module.exports = app;
