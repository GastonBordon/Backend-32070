const config = require("../../config.js")
const productsFactoryDAO = require("../model/DaoProducts/productsFactory.js")
console.log(productsFactoryDAO)

class productsApiContainer {

    // constructor() {
    //     this.productsDao = productsFactoryDAO.get(config.METODO_PERSISTENCIA)
    // }
    
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
            const productsDao = productsFactoryDAO.get(config.METODO_PERSISTENCIA)
            const data = await productsDao.readFile();
            return data;
        } catch (error) {
            throw new Error("Error al obtener archivo");
        }
    }

    async saveInFile({element}) {
        const productsDao = productsFactoryDAO.get(config.METODO_PERSISTENCIA)
        if (element.id) {
            const data = await productsDao.readFile();
            const newData = [...data, element];
            newData.sort((a, b) => a.id - b.id);
            await productsDao.writeFile(newData);
        } else {
            try {
                const data = await productsDao.readFile();
                const available = this.idAvailable(data);
                const id = available;

                const objectToAdd = {
                    ...element,
                    id: id,
                };
                const newData = [...data, objectToAdd];
                await productsDao.writeFile(newData);
                return objectToAdd;
            } catch (error) {
                throw new Error("Error al guardar archivo");
            }
        }
    }

    async deleteAllFile() {
        try {
            const productsDao = productsFactoryDAO.get(config.METODO_PERSISTENCIA)
            await productsDao.writeFile([]);
        } catch (error) {
            throw new Error("Error al borrar archivo");
        }
    }

    async getById({id}) {
        try {
            const productsDao = productsFactoryDAO.get(config.METODO_PERSISTENCIA)
            let elementsArray = await productsDao.readFile();
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

    async deleteById({id}) {
        try {
            let foundProduct = await this.getById(id);
            if (!foundProduct) {
                res.status(404).json({
                    error: "NOT FOUND 404!!! producto no encontrado",
                });
            } else {
                const productsDao = productsFactoryDAO.get(config.METODO_PERSISTENCIA)
                let dataArch = await productsDao.readFile();
                let element = dataArch.find((elem) => elem.id === Number(id));
                if (element) {
                    const dataArchFiltrado = dataArch.filter(
                        (elem) => elem.id !== Number(id)
                    );
                    await productsDao.writeFile(dataArchFiltrado);
                    return foundProduct
                } else {
                    throw new Error("Elemento no encontrado");
                }
            }
        } catch (error) {
            throw new Error("Error al eliminar id");
        }
    }

    async updateById({id, newValues}) {
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

const productsApi = new productsApiContainer();

module.exports = productsApi