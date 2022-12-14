const config = require("../../config.js")
const messagesFactoryDAO = require("../model/DaoMessages/messagesFactory")

class messagesApiContainer {
  constructor() {
    this.messagesDao = messagesFactoryDAO.get(config.METODO_PERSISTENCIA)
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

  async getAllFile() {
    try {
      const data = await this.messagesDao.readFile();
      return data.mensajes;
    } catch (error) {
      throw new Error("Error al obtener archivo");
    }
  }

  async readFile() {
    try {
      const data = await this.messagesDao.readFile();
      return data;
    } catch (error) {
      throw new Error("Error al obtener archivo");
    }
  }

  async saveInFile(element) {
    if (element.id) {
      const data = await this.messagesDao.readFile();
      const newData = [...data, element];
      newData.sort((a, b) => a.id - b.id);
      await messagesDao.writeFile(newData);
    } else {
      try {
        const data = await this.messagesDao.readFile();
        const available = this.idAvailable(data.mensajes);
        const id = available;
        const objectToAdd = { ...element, id: id };
        data.mensajes.push(objectToAdd);
        await this.messagesDao.writeFile(data);
        return objectToAdd;
      } catch (error) {
        throw new Error("Error al guardar archivo");
      }
    }
  }

  async deleteAllFile() {
    try {
      await this.messagesDao.writeFile([]);
    } catch (error) {
      throw new Error("Error al borrar archivo");
    }
  }

  async getById(id) {
    try {
      let elementsArray = await this.messagesDao.readFile();
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
        let dataArch = await messagesDao.readFile();
        let element = dataArch.find((elem) => elem.id === Number(id));
        if (element) {
          const dataArchFiltrado = dataArch.filter(
            (elem) => elem.id !== Number(id)
          );
          await this.messagesDao.writeFile(dataArchFiltrado);
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

const messagesApi = new messagesApiContainer("./src/DB/fs/mensajes.txt");

module.exports =  messagesApi ;
