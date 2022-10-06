const express = require("express");
const authMiddleware = require("../../middlewares/auth/auth.middleware");
const { Router } = express;

const router = Router();

router.delete("/out", authMiddleware, async (req, res) => {
  try {
    const username = req.session.username;
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`);
      }
    });
    req.render("main", { layouts: "index", username });
    setTimeout(() => {
      return res.status(200).send(`<h2>Hasta luego </h2>`);
    }, 50000);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
