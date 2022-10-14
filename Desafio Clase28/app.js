const express = require("express")
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
require("dotenv").config();

const passport = require("./middlewares/passport/passport.middleware");

const mainRouter = require("./routes/index.routes");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express();
//* Handlebars */

const handlebars = require("express-handlebars");
const path = require("path");
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

app.use(logger("dev"));

app.use(cookieParser(process.env.COOKIES_SECRET || '123456'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//*    INICIALIZO SESSION CON MONGO ATLAS    *//

app.use(
  session({
    secret: process.env.SESSION_SECRET || "123456",
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`,
      mongoOptions: advancedOptions,
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 15000,
    },
  })
);

//* ------     INICIALIZO PASSPORT EN LA APP    ------- *//.

app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.send(err);
  });
  

module.exports = app;
