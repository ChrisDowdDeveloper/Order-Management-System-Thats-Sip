const methodNotAllowed = require("../errors/methodNotAllowed");
const router = require("express").Router();
const controller = require("./items.controller");

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:item_id")
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;