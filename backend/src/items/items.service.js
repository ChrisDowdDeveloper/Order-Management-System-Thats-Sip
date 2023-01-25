const knex = require("../db/connection");

function list() {
    return knex("items")
        .select("*");
};

module.exports = {
    list,
}