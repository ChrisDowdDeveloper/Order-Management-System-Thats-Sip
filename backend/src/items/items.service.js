const knex = require("../db/connection");

// Creates a new product or supply item in the database
function create(newItem) {
    return knex("items")
        .insert(newItem)
        .returning("*")
        .then((res) => res[0]);
}

// Finds the item that matches the item_id
function read(item_id) {
    return knex("items")
        .select("*")
        .where({ item_id })
        .first();
}

// Lists all products or supply items in the database
function list() {
    return knex("items")
        .select("*");
};

// Deletes the product or supply item in the database
function deleteItem(item_id) {
    return knex("items")
        .where({ item_id })
        .del();
}

module.exports = {
    create,
    read,
    list,
    deleteItem,
}