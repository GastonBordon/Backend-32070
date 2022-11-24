const express = require("express");
const authMiddleware = require("../../middlewares/auth/auth.middleware");
const { Router } = express;
const passport = require("../../middlewares/passport/passport.middleware");

const router = Router();

const {
  renderLogin,
  renderSignup,
  login,
  logout,
  errorLogin,
  errorSignup
} = require ("../../controller/user.controller.js");


router.get("/login", authMiddleware, renderLogin);

router.post("/login",
  passport.authenticate('login', { failureRedirect: '/autherror' }), login);

router.get("/signup", renderSignup);

router.post("/signup",
  passport.authenticate('signup', { failureRedirect: '/signuperror' }), login)

router.get("/logout", authMiddleware, logout);

router.get("/autherror", errorLogin)

router.get("/signuperror", errorSignup)

module.exports = router;
