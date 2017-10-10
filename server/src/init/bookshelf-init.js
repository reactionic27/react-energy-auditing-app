import knex from './knex-init'
import Bookshelf from 'bookshelf'

const bookshelf = Bookshelf(knex);

bookshelf.plugin('registry');
bookshelf.plugin('visibility');

bookshelf.resolve = function(name) {
  return require("../models/" + name).default;
}

export {knex}

export default bookshelf;
