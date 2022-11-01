const log4js = require("log4js");

log4js.configure({
  appenders: {
    consola: { type: "console" },
    archivoErrores: { type: "file", filename: "logs/error.log" },
    archivoDebug: { type: "file", filename: "logs/debug.log" },

    loggerConsola: {
      type: "logLevelFilter",
      appender: "consola",
      level: "info",
    },
    loggerArchivoErrores: {
      type: "logLevelFilter",
      appender: "archivoErrores",
      level: "error",
    },
    loggerArchivoDebug: {
      type: "logLevelFilter",
      appender: "archivoDebug",
      level: "debug",
    },
  },

  categories: {
    default: {
      appenders: ["loggerConsola"],
      level: "all",
    },
    prod: {
      appenders: ["loggerArchivoErrores", "loggerArchivoDebug"],
      level: "all",
    },
  },
});

let logger = null;
if (process.env.NODE_ENV === "production") {  //**  la variable de entorno NODE_ENV tiene que ser traida del .env */
  logger = log4js.getLogger("prod");
} else {
  logger = log4js.getLogger();
}

module.exports = logger;
