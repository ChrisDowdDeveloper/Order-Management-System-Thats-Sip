const knex = require("../db/connection");

function create(newItem) {
    return knex("items")
        .insert(newItem)
        .returning("*")
        .then((res) => res[0]);
}

function read(item_id) {
    return knex("items")
        .select("*")
        .where({ item_id })
        .first();
}

function list() {
    return knex("items")
        .select("*");
};

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