/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("items", (table) => {
        table.increments("itemId").primary();
        table.string("itemName");
        table.string("itemUrl");
        table.string("itemJpg");
        table.integer("itemControl");
        table.string("itemType");
        table.string("itemSubType")
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("items");
};
