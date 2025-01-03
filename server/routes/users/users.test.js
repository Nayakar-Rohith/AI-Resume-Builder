const request=require('supertest')
const app=require('../../src/app')
require('dotenv').config();
const { connectToMongo, disconnectToMongo } = require('../../services/mongo')


describe("Launching API",()=>{
    beforeAll(async ()=>{
        await connectToMongo();
    })
    afterAll(async ()=>{
        await disconnectToMongo();
    })
    const data={
        _id:'106198295396364621292',
        email:'nayakarrohith123@gmail.com',
        name:'Rohith 123',
        resumeOptimizations: 1,
    }
    
    describe("testing GET /users",()=>{
        test('testing status code 200 for succesfull get method',async ()=>{
            await request(app).get('/v1/users')
            .expect(200)
        })
    })
    
    describe("testing Post /users",()=>{
        test('testing status code for invalid data',async ()=>{
            await request(app).post('/v1/users')
            .send(data)
            .expect('Content-Type',/json/)
            .expect(201)
    
        });
    })
})