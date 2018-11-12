'use strict';

import Model from './models.js';
import schema from './mongo-schemas/categories-schema.js';

class Categories extends Model {}

const categories = new Categories(schema);

export default categories;