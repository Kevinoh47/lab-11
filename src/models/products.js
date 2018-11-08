'use strict';

import Model from './models.js';
import schema from './mongo-schemas/products-schema.js';

class Products extends Model {}

const products = new Products(schema);

export default products;