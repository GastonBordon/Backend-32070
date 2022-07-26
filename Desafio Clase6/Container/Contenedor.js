const fs = require("fs");

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
      throw new Error("Error al leer el archivo");
    }
  }

  async saveInFile(product) {
    try {
      const readContent = await this.readFile();
      product.id = readContent.length + 1;
      readContent.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(readContent, null, 2)
      );
    } catch (error) {
      throw new Error("Error al escribir archivo");
    }
    return product.id;
  }

  async deleteAllFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error("Error al escribir archivo");
    }
  }

  async getById(id) {
    let productsArray = await this.readFile();
    const foundProduct = productsArray.find((prod) => prod.id === id);
    if (foundProduct !== undefined) {
      return foundProduct;
    } else {
      return null;
    }
  }

  async deleteById(id) {
    let productsArray = await this.readFile();
    let newProductsArray = [];
    newProductsArray = productsArray.filter((product) => product.id !== id);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(newProductsArray, null, 2)
    );
  }
}

module.exports = ContenedorArchivo;
