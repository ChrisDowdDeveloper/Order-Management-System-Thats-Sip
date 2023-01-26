const items = require("../fixtures/items");

exports.seed = function (knex) {
  return knex 
    .raw("TRUNCATE TABLE items RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("items").insert(items);
    });
};