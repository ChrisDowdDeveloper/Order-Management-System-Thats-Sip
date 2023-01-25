const methodNotAllowed = require("../errors/methodNotAllowed");
const router = require("express").Router();
const controller = require("./users.controller");

router
    .route("/items")
    .get(controller.list)
    .all(methodNotAllowed);


module.exports = router;