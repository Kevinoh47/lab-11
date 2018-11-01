'use strict';

// Mock the Mongo DB server
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
let mongoServer;

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

});



