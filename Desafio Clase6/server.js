const express = require("express");
const contenedor = require("./Container/main.js");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto: ${server.address().port}`);
});

app.get("/productos", async (req, res) => {
  let products = await contenedor.getAllFile();
  res.send(products);
});

app.get("/productoRandom", async (req, res) => {
  const between = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const products = await contenedor.getAllFile();

  const allIds = products.map((e) => e.id);

  const random = between(0, allIds.length);

  const idRandom = allIds[random];

  const productRandom = await contenedor.getById(idRandom);

  res.send(productRandom);
});
