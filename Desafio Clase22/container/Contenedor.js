const fs = require("fs");

// const path = "products.txt";
// const path2 = "mensajes.txt";

class ContenedorArchivo {
  constructor(name, options) {
    this.name = name;
    this.options = options;
    this.knex = require("knex")(this.options);
    this.createTable();
  }

  createTable() {
    this.knex.schema.hasTable(this.name).then((exists) => {
      if (!exists) {
        if (this.name === "products") {
          this.knex.schema
            .createTable(this.name, (table) => {
              table.string("title"),
                table.float("price"),
                table.string("thumbnail"),
                table.increments("id");
              table.timestamp("timeStamp").defaultTo(this.knex.fn.now());
            })
            .then(() => console.log("tabla creada"))
            .catch((err) => console.log(err))
            .finally(() => this.knex.destroy());
        } else {
          this.knex.schema
            .createTable(this.name, (table) => {
              table.string("email"),
                table.string("mensaje"),
                table.increments("id");
              table.timestamp("fecha").defaultTo(this.knex.fn.now());
            })
            .then(() => console.log("tabla creada"))
            .catch((err) => console.log(err))
            .finally(() => this.knex.destroy());
        }
      }
    });
  }

  async getAllFile() {
    try {
      const data = await this.knex.from(this.name).select("*");
      return data;
    } catch (error) {
      throw new Error("Error al obtener archivo");
    }
  }

  async saveInFile(product) {
    try {
      const data = await this.knex(this.name).insert(product);
      return data;
    } catch (error) {
      throw new Error("Error al guardar archivo");
    }
  }

  async deleteAllFile() {
    try {
      this.knex.from(this.name).del();
    } catch (error) {
      throw new Error("Error al borrar archivo");
    }
  }

  async getById(id) {
    try {
      const data = await this.knex
        .from(this.name)
        .select("id")
        .where("id", "===", id);
      return data;
    } catch (error) {
      throw new Error("Error al obtener id");
    }
  }

  async deleteById(id) {
    try {
      this.knex.from(this.name).where("id", "===", id).del();
    } catch (error) {
      throw new Error("Error al eliminar id");
    }
  }
}

module.exports = ContenedorArchivo;
