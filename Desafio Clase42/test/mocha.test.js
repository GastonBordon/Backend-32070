const productsApi =  require('../src/api/products.api')

class TestProductos {
    constructor(){
        this.products = productsApi
    }
    async lectura () {
        try {
            const data = await productsApi.getAllFile()
            return { data: data, message: "Productos leidos correctamente" }
        } catch (error) {
            throw new Error("Error al leer el archivo");
        }
        }
    async escritura () {
        try {
            const data = await this.products.saveInFile(  
                {
                title: 'Testing',
                price: '123',
                thumbnail: 'https://esuntest',
                id: 999,
                })
                return {data: data.data, message: "Producto agregado correctamente"}
        } catch (error) {
            throw new Error("Error al escribir archivo");
        }
        }
    async modificacion () {
        try {
            const data = await this.products.updateById(999, {
                title: 'TestingModificado',
                price: '456',
                thumbnail: 'https://esuntest',
                })
                return {data: data.data, message: "Producto modificado correctamente"}
        } catch (error) {
            throw new Error("Error al modificar archivo");
        }
        }
    async eliminacion () {
        try {
            await this.products.updateById(999)
            return {status: 201, message: "Producto eliminado correctamente"}
        } catch (error) {
            throw new Error("Error al borrar archivo");
        }}
}

module.exports = TestProductos