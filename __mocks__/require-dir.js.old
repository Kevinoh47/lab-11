'use strict';

const phonyModelFunction = jest.fn( () => {
  return Promise.resolve({});
});

const mockModel = {
  default: {
    find: phonyModelFunction,
    delete: phonyModelFunction,
    put: phonyModelFunction,
    patch: phonyModelFunction,
    save: phonyModelFunction,
  },
};

export default (dir) => {
  if ( typeof dir !== 'string' ) { return {}; }
  return {
    'foo': mockModel,
  };
};

