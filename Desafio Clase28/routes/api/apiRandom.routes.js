const express = require("express");
const { Router } = express;

const router = Router();

const getRandomNumbers = (qNumber) => {
  const randoms = [];
  for (let index = 0; index <= qNumber; index++) {
    const randomNumber = Math.floor(Math.random() * 1000);
    randoms.push(randomNumber);
  }
  return randoms;
};

router.get("/", (req, res) => {
  res.status(200).json(getRandomNumbers(100));
});

router.get("/:cant", (req, res) => {
  const cant = req.params.cant;
  res.status(200).json(getRandomNumbers(cant));
});

module.exports = router;
