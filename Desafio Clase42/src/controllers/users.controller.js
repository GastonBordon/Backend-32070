const renderLogin = async (req, res) => { 
    return res.status(200).redirect("/api/productos");
}

const renderSignup = async (req, res) => {
    res.render("signup", { layouts: "index" });
}

const login = (req, res) => {
    req.session.username = req.body.username;
    req.session.admin = true;
    res.status(200).redirect("/api/productos");
}

const logout = async (req, res) => {
    try {
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

const errorLogin = (req,res) =>{
    res.render("error", { layouts: "index", login: true });
}

const errorSignup = (req,res)=>{
    res.render("error", { layouts: "index", signup: true });
}

module.exports = { renderLogin, renderSignup, login, logout, errorLogin, errorSignup }
