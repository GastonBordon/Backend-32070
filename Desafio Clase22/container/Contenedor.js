const fs = require("fs");


class ContenedorArchivo {
  constructor(path) {
    this.path = path;
    this.connect();
  }

  idAvailable(array) {
    const sortedArray = array.slice().sort(function (a, b) {
      return a.id - b.id;
    });
    let previousId = 0;
    for (let element of sortedArray) {
      if (element.id != previousId + 1) {
        return previousId + 1;
      }
      previousId = element.id;
    }
    return previousId + 1;
  }

  async connect() {
    console.log("File System Connected");
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

  async saveInFile(element) {
    if (element.id) {
      const data = await this.readFile();
      const newData = [...data, element];
      newData.sort((a, b) => a.id - b.id);
      await fs.promises.writeFile(this.path, JSON.stringify(newData, null, 2));
    } else {
      try {
        const data = await this.readFile();
        const available = this.idAvailable(data);
        const id = available;

        const objectToAdd = { ...element, id: id };
        const newData = [...data, objectToAdd];
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(newData, null, 2)
        );
        return objectToAdd;
      } catch (error) {
        throw new Error("Error al guardar archivo");
      }
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
      let elementsArray = await this.readFile();
      const foundElement = elementsArray.find((elem) => elem.id === Number(id));
      if (foundElement !== undefined) {
        return foundElement;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error al obtener id");
    }
  }

  async deleteById(id) {
    try {
      let foundProduct = await this.getById(id);
      if (!foundProduct) {
        res.status(404).json({
          error: "NOT FOUND 404!!! producto no encontrado",
        });
      } else {
        let dataArch = await this.readFile();
        let element = dataArch.find((elem) => elem.id === Number(id));
        if (element) {
          const dataArchFiltrado = dataArch.filter(
            (elem) => elem.id !== Number(id)
          );
          await this.saveInFile(dataArchFiltrado);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(dataArchFiltrado, null, 2),
            "utf-8"
          );
        } else {
          throw new Error("Elemento no encontrado");
        }
      }
    } catch (error) {
      throw new Error("Error al eliminar id");
    }
  }

  async updateById(id, newValues) {
    let foundProduct = await this.getById(id);
    if (!foundProduct) {
      res.status(404).json({
        error: "NOT FOUND 404!! producto no encontrado!!",
      });
    } else {
      for (const element in foundProduct) {
        for (const elem in newValues) {
          if (element === elem) {
            foundProduct[element] = newValues[elem];
          }
        }
      }
      foundProduct.timestamp = Date.now();
      await this.deleteById(id);
      await this.saveInFile(foundProduct);
    }
  }
}

module.exports = ContenedorArchivo;
// const fs = require("fs");

// // const path = "products.txt";
// // const path2 = "mensajes.txt";

// class ContenedorArchivo {
//   constructor(name, options) {
//     this.name = name;
//     this.options = options;
//     this.knex = require("knex")(this.options);
//     this.createTable();
//   }

//   createTable() {
//     this.knex.schema.hasTable(this.name).then((exists) => {
//       if (!exists) {
//         if (this.name === "products") {
//           this.knex.schema
//             .createTable(this.name, (table) => {
//               table.string("title"),
//                 table.float("price"),
//                 table.string("thumbnail"),
//                 table.increments("id");
//               table.timestamp("timeStamp").defaultTo(this.knex.fn.now());
//             })
//             .then(() => console.log("tabla creada"))
//             .catch((err) => console.log(err))
//             .finally(() => this.knex.destroy());
//         } else {
//           this.knex.schema
//             .createTable(this.name, (table) => {
//               table.string("email"),
//                 table.string("mensaje"),
//                 table.increments("id");
//               table.timestamp("fecha").defaultTo(this.knex.fn.now());
//             })
//             .then(() => console.log("tabla creada"))
//             .catch((err) => console.log(err))
//             .finally(() => this.knex.destroy());
//         }
//       }
//     });
//   }

//   async getAllFile() {
//     try {
//       const data = await this.knex.from(this.name).select("*");
//       return data;
//     } catch (error) {
//       throw new Error("Error al obtener archivo");
//     }
//   }

//   async saveInFile(product) {
//     try {
//       const data = await this.knex(this.name).insert(product);
//       return data;
//     } catch (error) {
//       throw new Error("Error al guardar archivo");
//     }
//   }

//   async deleteAllFile() {
//     try {
//       this.knex.from(this.name).del();
//     } catch (error) {
//       throw new Error("Error al borrar archivo");
//     }
//   }

//   async getById(id) {
//     try {
//       const data = await this.knex
//         .from(this.name)
//         .select("id")
//         .where("id", "===", id);
//       return data;
//     } catch (error) {
//       throw new Error("Error al obtener id");
//     }
//   }

//   async deleteById(id) {
//     try {
//       this.knex.from(this.name).where("id", "===", id).del();
//     } catch (error) {
//       throw new Error("Error al eliminar id");
//     }
//   }
// }

// module.exports = ContenedorArchivo;
