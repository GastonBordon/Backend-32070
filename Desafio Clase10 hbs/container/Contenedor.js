const fs = require("fs");

const path = "products.txt";

class ContenedorArchivo {
  constructor(path) {
    this.path = path;
  }

  async readFile() {
    if (fs.existsSync(this.path)) {
      try {
        const data = await fs.promises.readFile(this.path, "utf-8");

        return JSON.parse(data);
      } catch (error) {
        throw new Error("Error al leer archivo");
      }
    } else {
      try {
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        throw new Error("Error al escribir el archivo");
      }
    }
  }

  async getAllFile() {
    try {
      const data = await this.readFile();
      return data;
    } catch (error) {
      throw new Error("Error al obtener archivo");
    }
  }

  async saveInFile(product) {
    try {
      const data = await this.readFile();
      const id = data.length == 0 ? 1 : data[data.length - 1].id + 1;
      const objectToAdd = { ...product, id: id };
      const newData = [...data, objectToAdd];
      await fs.promises.writeFile(this.path, JSON.stringify(newData, null, 2));
      return objectToAdd;
    } catch (error) {
      throw new Error("Error al guardar archivo");
    }
  }

  async deleteAllFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error("Error al borrar archivo");
    }
  }

  async getById(id) {
    try {
      let productsArray = await this.readFile();
      const foundProduct = productsArray.find((prod) => prod.id === id);
      if (foundProduct !== undefined) {
        return foundProduct;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error al obtener id");
    }
  }

  async deleteById(id) {
    try {
      let dataArch = await this.readFile();
      let product = dataArch.find((prod) => prod.id === id);
      if (product) {
        const dataArchFiltrado = dataArch.filter((prod) => prod.id !== id);
        // await this.saveInFile(dataArchFiltrado);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(dataArchFiltrado, null, 2),
          "utf-8"
        );
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      throw new Error("Error al eliminar id");
    }
  }
}

const fileContainer = new ContenedorArchivo(path);

module.exports = fileContainer;
