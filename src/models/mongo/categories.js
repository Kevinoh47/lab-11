'use strict';

import Storage from '../../lib/storage/storage.js';
import schema from '../../models/categories.js';

console.log('SCHEMA!!!: ', schema);

// TODO schema is undefined. where does schema come from?
const storage = new Storage(schema);

class Categories {

  static find(query) {
    return storage.find(query);
  }

  static findOne(id) {
    let query = { _id:id };
    return this.find(query);
  }

  static schema() {
    return typeof schema.jsonSchema === 'function' ? schema.jsonSchema() : {};
  }

  static save(data) {
    return storage.save(data);
  }
 
  static put(id, data) {
    return storage.save(data);
  }

  static delete(id) {
    return storage.delete(id);
  }

}

export default Categories;