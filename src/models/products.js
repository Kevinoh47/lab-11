'use strict';

import Storage from '../lib/storage/storage.js';
import schema from './mongo/products-schema';

const storage = new Storage(schema);

class Products{

  static findOne(id) {
    let query = { _id:id };
    return this.find(query);
  }

  static find(query) {
    return storage.find(query);
  }

  static save(data) {
    return storage.save(data);
  }

  static delete(id) {
    return storage.delete(id);
  }

  static put(id, data) {
    return storage.save(data);
  }

  static patch(id, data) {
    data._id = id;
    return storage.save(data);
  }

}

export default Products;
