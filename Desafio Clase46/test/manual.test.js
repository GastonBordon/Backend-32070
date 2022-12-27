const TestProductos = require ("./mocha.test")
const Test = new TestProductos()

const testing = async () => {
const lectura = await Test.lectura()
console.log(lectura.message)
const escritura = await Test.escritura()
console.log(escritura.message)
const modificacion = await Test.modificacion()
console.log(modificacion.message)
const eliminacion = await Test.eliminacion()
console.log(eliminacion.message)
}

testing()

