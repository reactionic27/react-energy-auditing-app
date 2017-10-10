
exports.up = function(knex, Promise) {
  return knex.schema.table('v5_rec_definitions', (t) => {
    t.integer('order')
  })
  .then(() => {
    const updates = [{
      id: 1,
      order: 18
    }, {
      id: 2,
      order: 13
    }, {
      id: 3,
      order: 16
    }, {
      id: 4,
      order: 4
    }, {
      id: 5,
      order: 15
    }, {
      id: 6,
      order: 20
    }, {
      id: 7,
      order: 19
    }, {
      id: 8,
      order: 11
    }, {
      id: 9,
      order: 5
    }, {
      id: 10,
      order: 1
    }, {
      id: 11,
      order: 6
    }, {
      id: 12,
      order: 3
    }, {
      id: 13,
      order: 10
    }, {
      id: 14,
      order: 9
    }, {
      id: 15,
      order: 2
    }, {
      id: 16,
      order: 12
    }, {
      id: 17,
      order: 17
    }, {
      id: 18,
      order: 22
    }, {
      id: 19,
      order: 0
    }, {
      id: 20,
      order: 14
    }, {
      id: 21,
      order: 21
    }, {
      id: 22,
      order: 7
    }, {
      id: 23,
      order: 8
    }]
    return Promise.all(updates.map((obj) => {
      return knex('v5_rec_definitions').update({order: obj.order}).where({id: obj.id})
    }))
  })
};

exports.down = function(knex, Promise) {
  return knex.table('v5_rec_definitions', (t) => {
    t.dropColumn('order')
  })
};
