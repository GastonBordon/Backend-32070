const express = require("express");
const authMiddleware = require("../../middlewares/auth/auth.middleware");
const { Router } = express;

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const { username, admin } = req.session;
  res.render("main", { layouts: "index" });
});

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("logged");
    req.session.username = username;
    req.session.admin = true;
    return res.status(200).render("main", { layouts: "index" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
