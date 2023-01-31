const knex = require("../db/connection");

function list() {
    return knex("items")
        .select("*");
};

function deleteItem(item_id) {
    return knex("items")
        .where({ item_id })
}

module.exports = {
    list,
    deleteItem,
}