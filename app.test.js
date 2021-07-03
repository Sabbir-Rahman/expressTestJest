
const request = require('supertest')
const app = require('./app')

describe('To do api', () => {

    test('GET /todos --> array todos', () => {
        return request(app)
            .get('/todos')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: expect.any(String),
                            completed: expect.any(Boolean)
                        })
                    ])
                )
            })
    })

    test('GET /todos/id --> specific to do bt id', () => {
        return request(app)
            .get('/todos/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(

                    expect.objectContaining({
                        name: expect.any(String),
                        completed: expect.any(Boolean)
                    })

                )
            })
    })

    test('GET /todos/id --> 404 if not found', () => { 
        return request(app).get('/todos/999999').expect(404)
    })

    test('POST /todos --> craeted to do', () => { 
        return request(app).post('/todos').send({
            name: 'do dishes'
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res)=> {
            expect(res.body).toEqual(
                expect.objectContaining({
                    name: 'do dishes',
                    completed: false
                })
            )
        })
    })

    test('GET /todos -- validates request body', () => {
        return request(app).post('/todos').send({ name: 123}).expect(422)
     })
})