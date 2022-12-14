const TestProductos = require ("./mocha.test")
const config = require('../config.js')
const assert = require('assert').strict
const request = require('supertest')(`http://localhost:${config.PORT}/api/productos`)
const expect = require('chai').expect
const { response } = require("express")


describe('Pruebas test API productos', () => {

    it('Crear instancia TEST', () => {
        const Test = new TestProductos();
        assert.strictEqual(!Test.lectura, false)
    })

    describe('GET', () => {
        it('deberia devolver listado de productos', async () => {
            const response = await request.get('/all')
            expect(Array.isArray(response._body)).to.eql(true)
        })
    })

    describe('POST', () => {
        it('deberia incorporar un nuevo producto', async () => {
            const response = await request.post('/').send({
                title: 'Testing',
                price: '123',
                thumbnail: 'https://esuntest',
                id: 999,
                })
            expect(response.status).to.eql(201)
        })
    })

    describe('GET', () => {
        it('deberia devolver un producto buscado por su ID', async () => {
            const response = await request.get('/999')
            expect(response.status).to.eql(201)
        })
    })

    describe('PUT', () => {
        it('deberia modificar un producto buscado por su ID', async () => {
            await request.put('/999').send({title: "modificado"})
            const response = await request.get('/999')
            expect(response._body.data.title).to.eql('modificado')
        })
    })

    describe('DELETE', () => {
        it('Deberia verificar que el producto fue eliminado', async () => {
            await request.delete('/999')
            const response = await request.get('/999')
            expect(!response._body.Error).to.eql(false)
        })
    })
})