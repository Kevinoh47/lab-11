
'use strict';

import mongoose from 'mongoose';
import jsonSchema from 'mongoose-schema-jsonschema';
jsonSchema(mongoose);

const categories = mongoose.Schema({
  title: {type:String, require:true},
  text: {type: String},
});

categories.pre('save', function() {
  // console.log('doing the new thing with', this);
});

categories.pre('update', function() {
  // console.log('doing the update thing with', this);
});

categories.pre('findOneAndRemove', function() {
  // console.log('bye bye bye');
});

export default mongoose.model('categories', categories);
