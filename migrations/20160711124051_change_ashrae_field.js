exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('alter table `v5_basedata` modify ashrae_required_additional_cfm varchar(255);'),
    knex.raw('alter table `v5_basedata` modify ashrae_required_additional_cfm_improved varchar(255);'),
    knex.raw('alter table `v5_basedata` modify ashrae_minimum_cfm50_improved int(10);'),
  ])
};

exports.down = function(knex, Promise) {


};
