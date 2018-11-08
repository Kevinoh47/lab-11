'use strict';

import mongoose from 'mongoose';
import jsonSchema from 'mongoose-schema-jsonschema';
jsonSchema(mongoose);

const products = new mongoose.Schema({
  name: {type:String},
  description: {type:String},
  price: {type:Number},
  category:({type:String}),
});

// products.pre('save', function() {
//   // console.log('doing the new thing with', this);
// });

// products.pre('update', function() {
//   // console.log('doing the update thing with', this);
// });

// products.pre('findOneAndRemove', function() {
//   // console.log('bye bye bye');
// });

export default mongoose.model('products', products);
