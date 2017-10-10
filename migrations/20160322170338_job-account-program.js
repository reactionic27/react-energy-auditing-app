
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('alter table `jobs` modify account_id int(10) unsigned DEFAULT NULL;'),
    knex.raw('alter table `jobs` modify program_id int(10) unsigned DEFAULT NULL;'),
  ])
};

exports.down = function(knex, Promise) {

};
