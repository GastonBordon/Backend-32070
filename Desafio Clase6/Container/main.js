const { getCipherInfo } = require("crypto");
const ContenedorArchivo = require("./Contenedor.js");

const path = "./dataBase/productos.txt";

const producto1 = {
  title: "Paleta de Pintor",
  price: 168,
  thumbnail:
    "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-06-512.png",
};
const producto2 = {
  title: "Microscopio",
  price: 1250,
  thumbnail:
    "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-10-512.png",
};
const producto3 = {
  title: "Lápiz HB",
  price: 15,
  thumbnail:
    "https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/pencil-512.png",
};
const producto4 = {
  title: "Tijera",
  price: 40,
  thumbnail:
    "https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/closed-scissor-512.png",
};
const contenedor = new ContenedorArchivo(path);
(async () => {
  await contenedor.saveInFile(producto2);
  await contenedor.saveInFile(producto1);
  await contenedor.saveInFile(producto3);
  await contenedor.saveInFile(producto4);
})();

module.exports = contenedor;
