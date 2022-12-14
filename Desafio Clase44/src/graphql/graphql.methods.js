const config = require("../../config.js")
const productsFactoryDAO = require("../model/DaoProducts/productsFactory.js")

class productsApiContainer {
    constructor() {
        this.productsDao = productsFactoryDAO.get(config.METODO_PERSISTENCIA)
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
            console.log(this.productsDao)
            const data = await this.productsDao.readFile();
            return data;
        } catch (error) {
            throw new Error("Error al obtener archivo");
        }
    }

    async saveInFile({element}) {
        if (element.id) {
            const data = await this.productsDao.readFile();
            const newData = [...data, element];
            newData.sort((a, b) => a.id - b.id);
            await productsDao.writeFile(newData);
        } else {
            console.log(element)
            try {
                const data = await this.productsDao.readFile();
                const available = this.idAvailable(data);
                const id = available;

                const objectToAdd = {
                    ...element,
                    id: id,
                };
                const newData = [...data, objectToAdd];
                await this.productsDao.writeFile(newData);
                return objectToAdd;
            } catch (error) {
                throw new Error("Error al guardar archivo");
            }
        }
    }

    async deleteAllFile() {
        try {
            await this.productsDao.writeFile([]);
        } catch (error) {
            throw new Error("Error al borrar archivo");
        }
    }

    async getById({id}) {
        try {
            console.log(id)
            let elementsArray = await this.productsDao.readFile();
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
                let dataArch = await this.productsDao.readFile();
                let element = dataArch.find((elem) => elem.id === Number(id));
                if (element) {
                    const dataArchFiltrado = dataArch.filter(
                        (elem) => elem.id !== Number(id)
                    );
                    await this.productsDao.writeFile(dataArchFiltrado);
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