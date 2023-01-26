/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("items", (table) => {
        table.increments("item_id").primary();
        table.string("item_name");
        table.string("item_url");
        table.bytea("item_jpg");
        table.integer("item_control");
        table.string("item_type");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("items");
};
