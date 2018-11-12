
'use strict';

import mongoose from 'mongoose';
import jsonSchema from 'mongoose-schema-jsonschema';
jsonSchema(mongoose);

const categories = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
});

categories.pre('save', function() {
  console.log('mongoose pre save for this: ', this);
});

categories.pre('update', function() {
  console.log('mongoose pre update for this: ', this);
});

categories.pre('findOneAndRemove', function() {
  console.log('mongoose pre delete for this: ', this);
});

export default mongoose.model('categories', categories);
