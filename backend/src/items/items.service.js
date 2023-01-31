const knex = require("../db/connection");

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
}

module.exports = {
    read,
    list,
    deleteItem,
}