exports.up = knex => knex.schema.createTable('movies', table => {
  table.increments('id');
  table.text('title');
  table.text('description');
  table.text('note')
  
  table.integer('user_id').references('id').inTable('users');

  table.timestamp('create_at').default(knex.fn.now());
  table.timestamp('update_at').default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('movies');