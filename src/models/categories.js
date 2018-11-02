
'use strict';

import mongoose from 'mongoose';
import jsonSchema from 'mongoose-schema-jsonschema';
jsonSchema(mongoose);

const categories = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
});

/* TODO figure out what mongoose.pre function is for . these middleware functions came in the scaffolding code... */
categories.pre('save', function() {
  console.log('doing the save new thing with', this);
});

categories.pre('update', function() {
  console.log('doing the update thing with', this);
});

categories.pre('findOneAndRemove', function() {
  console.log('bye bye bye');
});

export default mongoose.model('categories', categories);
