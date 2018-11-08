'use strict';


require('dotenv').config('../../.env'); 

//process.env.STORAGE = 'mongo';

// Mock the Mongo DB server
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
let mongoServer;

// Unmock our model (it was previously mocked for the model finder and we don't want that mock here. So we have to unmock it. )
jest.unmock('require-directory');

// Mock the API Server
const {server} = require('../../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll( async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, (err) => {
    if(err) {console.log(err);}
  });
});

afterAll( () => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('API Server', () => {
  it('should respond with 500 on an invalid model', () => {
    return mockRequest
      .get('/thisrouteshouldfail')
      .then(results => {
        expect(results.status).toBe(404);
      })
      .catch( err => {
        expect(err).not.toBeDefined();
      });
  });

  it('post(/api/v1/categories... should take an object and save it', () => {
    let obj = {name:'foo'};
    
    return mockRequest  
      .post('/api/v1/categories')
      .send(obj)
      .then( results => { 
        expect(results.status).toBe(200);
        expect(results.body.name).toEqual(obj.name);
        expect(results.body._id).toBeDefined();
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

});



