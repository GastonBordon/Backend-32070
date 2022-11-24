const { logger } = require("../middlewares/logger/logger.pino.js");

const renderLogin = async (req, res) => {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);
  
    return res.status(200).redirect("/api/productos");
  }

const renderSignup = async (req, res) => {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);
  
    res.render("signup", { layouts: "index" });
  }

const login = (req, res) => {
    console.log(req.body)
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);

    req.session.username = req.body.username;
    req.session.admin = true;
    res.status(200).redirect("/api/productos");
  }

const logout = async (req, res) => {
    try {
      const { url, method } = req;
      logger.info("Ruta %s  Metodo: %s", url, method);
  
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`);
        }
      });
      return res.status(200).redirect("/api/productos");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

const errorLogin = (req, res) => {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);
    
    res.render("error", { layouts: "index", login: true });
  }

const errorSignup = (req, res) => {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);
    
    res.render("error", { layouts: "index", signup: true });
  }

module.exports = {renderLogin, renderSignup, login, logout, errorLogin, errorSignup }
