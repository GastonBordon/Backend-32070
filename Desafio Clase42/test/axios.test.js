const config = require('../config.js')
const { default: axios } = require("axios");

const testProductos = {
lectura : async (URL, endpoint) =>{
try {
    const data = await axios.get(`${URL}${endpoint}/all`)
    return {data: data.data, message: "Productos leidos correctamente"}
} catch (error) {
    throw new Error("Error al leer el archivo");
}
},
escritura : async (URL, endpoint) =>{
try {
    const data = await axios.post(`${URL}${endpoint}/`,  
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
},
modificacion : async (URL, endpoint)  =>{
try {
    const data = await axios.put(`${URL}${endpoint}/999`,{
        title: 'TestingModificado',
        price: '456',
        thumbnail: 'https://esuntest',
        })
        return {data: data.data, message: "Producto modificado correctamente"}
} catch (error) {
    throw new Error("Error al modificar archivo");
}
},
eliminacion : async (URL, endpoint)  =>{
try {
    axios.delete(`${URL}${endpoint}/999`)
    return {status: 201, message: "Producto eliminado correctamente"}
} catch (error) {
    throw new Error("Error al borrar archivo");
}}
}
const URL = `http://localhost:${config.PORT}`
const endpoint = '/api/productos'

Promise.all([
    testProductos.lectura(URL, endpoint),
    testProductos.escritura(URL, endpoint),
    testProductos.modificacion(URL, endpoint),
    testProductos.eliminacion(URL, endpoint)
]).then((results)=>{
    console.log(results[0].message)
    console.log(results[1].message)
    console.log(results[2].message)
    console.log(results[3].message)
})