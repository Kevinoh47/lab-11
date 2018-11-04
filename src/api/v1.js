'use strict';

import express from 'express';

//import modelFinder from '../middleware/model-finder.js';
//import products from '../models/products.js';

// TODO  to be able to switch back and forth between mongo and filesystem storage, we will need to switch between /models/categories.js and /models/mongo/categories.js. But 'import' must be at top level
// let storage = process.env.STORAGE;
// if (storage === 'mongo') {
//   import categories from '../models/mongo/categories.js';
// } else {
//   import categories from '../models/categories.js';
// }

import categories from '../models/mongo/categories.js';

const router = express.Router();

let sendJSON = (data,response) => {
  response.statusCode = 200;
  response.statusMessage = 'OK';
  response.setHeader('Content-Type', 'application/json');
  response.write( JSON.stringify(data) );
  response.end();
};

//router.param('model', modelFinder);

router.get('/api/v1/categories/schema', (request,response) => {
  sendJSON(categories.schema(), response);
});

router.get('/api/v1/categories', (request,response,next) => {
  categories.find()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      sendJSON(output, response);
    })
    .catch(next);
});

router.get('/api/v1/categories/:id', (request,response,next) => {
  categories.find({_id:request.params.id})
    .then( result => sendJSON(result[0], response))
    .catch(error => {return next(error);});
});

router.post('/api/v1/categories', (request,response,next) => {
  //let category = new categories(request.body);
  //category.save(request.body)
  categories(request.body)
    .then ( result => sendJSON(result, response))
    .catch(error => {return next(error);});
});

router.put('/api/v1/categories/:id', (request,response,next) => {
  // put requires id in body
  request.body._id = request.params.id;
  categories.findByIdAndUpdate(request.params.id, request.body)
    .then( result => sendJSON(result, response) )
    .catch( next );
});

router.patch('/api/v1/categories/:id', (request,response,next) => {
  categories.findByIdAndUpdate(request.params.id, request.body)
    .then(result => sendJSON(result, response))
    .catch(next);
});

router.delete('/api/v1/categories/:id', (request,response,next) => {
  categories.findByIdAndRemove(request.params.id)
    .then( result => {
      if(!result) {
        throw `could not find id ${request.params.id} to delete.`;
      }
      sendJSON(result, response);
    })

    .catch(next);
});

export default router;
