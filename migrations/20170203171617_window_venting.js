    exports.up = function(knex, Promise) {
      return knex.schema.table('v5_basedata', (t) => {
        t.enu('window_venting_used', ["Yes", "No"]).defaultTo('No')
        t.enu('window_venting_used_improved', ["Yes", "No"]).defaultTo('No')
      })
    };

    exports.down = function(knex, Promise) {
      return knex.schema.table('v5_basedata', (t) => {
        t.dropColumn('window_venting_used')
        t.dropColumn('window_venting_used_improved')
      })
    };
