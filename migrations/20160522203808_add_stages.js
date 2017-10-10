
exports.up = function(knex, Promise) {
  return knex.truncate('v5_stages')
    .then(() => knex.insert([
      {id: 1, name: 'Lead'},
      {id: 2, name: 'Audit'},
      {id: 3, name: 'Bid Proposed'},
      {id: 4, name: 'Bid Approved'},
      {id: 5, name: 'Retrofit In Progress'},
      {id: 6, name: 'Retrofit Complete'},
      {id: 7, name: 'QA'},
      {id: 8, name: 'Uncategorized'},
      {id: 9, name: 'Archived Won'},
      {id: 10, name: 'Archived Lost'}
    ]).into('v5_stages'))
};

exports.down = function(knex, Promise) {

};
