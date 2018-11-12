'use strict';

require('dotenv').config('../../.env'); 

// Mock the Mongo DB server
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
let mongoServer;

// Unmock our model (it was previously mocked for the model finder and we don't want that mock here. So we have to unmock it. )
jest.unmock('require-directory');
jest.setTimeout(30000);

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

  it('should take a categories object and save it', () => {
    let obj = {name:'spirits ',description:'Alcohol from around the world'};
    
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

  it('should respond properly on a get request to a valid model (categories)', () => {

    return mockRequest
      .get('/api/v1/categories')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });

  });

  it('should be able to post to /api/v1/categories', ()  => {

    let obj = {name:'cheese',description:'Cheese from around the world'};

    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toEqual(obj.name);
      })
      .catch( err => console.error('err', err) );
  });


  it('following a post, should find a single record', () => {

    let obj = {name:'fruit',description:'Our store has fruit'};

    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(results => {
        return mockRequest.get(`/api/v1/categories/${results.body._id}`)
          .then(list => {
            expect(list.body[0].name).toEqual(obj.name);
            expect(list.status).toBe(200);
          });
      })
      .catch( err => console.error('err', err) );

  });

  it('following multiple posts, should return the correct count', () => {

    return mockRequest
      .get('/api/v1/categories')
      .then(results => {
        expect(results.body.count).toEqual(3);
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  /** Products **/
  it('should take a products object and save it', () => {
    let obj = {name:'Acme Bourbon',description:'Fine whiskey', price:47, category:'spririts'};
    
    return mockRequest  
      .post('/api/v1/products')
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

  it('should respond properly on a get request to a valid model (products)', () => {

    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });

  });

  it('should be able to post to /api/v1/products', ()  => {

    let obj = {name:'Acme Wine',description:'Fine wine', price:17, category:'wines'};

    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toEqual(obj.name);
      })
      .catch( err => console.error('err', err) );
  });


  it('following a post, should find a single record', () => {

    let obj = {name:'Acme Beer',description:'Fine beer', price:11, category:'beer'};

    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(results => {
        return mockRequest.get(`/api/v1/products/${results.body._id}`)
          .then(list => {
            expect(list.body[0].name).toEqual(obj.name);
            expect(list.status).toBe(200);
          });
      })
      .catch( err => console.error('err', err) );

  });

  it('following multiple posts, should return the correct count', () => {

    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        expect(results.body.count).toEqual(3);
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

});



