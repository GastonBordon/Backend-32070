const express = require("express");
const authMiddleware = require("../../middlewares/auth/auth.middleware");

const { Router } = express;
const passport = require('../../middlewares/passport/passport.middleware')

const router = Router();


router.get("/login", authMiddleware, async (req, res) => {
  console.log('redirect')
  return res.status(200).redirect("/api/productos");
});


router.post("/login", passport.authenticate('login', {
  failureRedirect: '/login'
}), (req, res) => {
  console.log("logueo???")
  req.session.username = req.body.username;
  req.session.admin = true;
  res.status(200).redirect("/api/productos");
});


router.get("/signup", async (req, res) => {
  res.render("signup", { layouts: "index" });
});


router.post("/signup", passport.authenticate('signup', {
  failureRedirect: '/signup'
}), (req, res) => {
  req.session.username = req.body.username;
  req.session.admin = true;
  res.status(200).redirect("/api/productos");
})


router.get("/logout", authMiddleware, async (req, res) => {
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
});

module.exports = router;
