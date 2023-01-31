const service = require("./items.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const checkout = require("../../bot")

async function itemExists(req, res, next) {
    const { item_id } = req.body;
    const item = await service.read(item_id);
    if (item) {
        res.locals.item = item;
        return next();
    }
    next({
        status: 404,
        message: `Item ${item_id} does not exist.`,
    });
}

async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

async function create(req, res) {
    let form = req.body.form;
    let supplyOrder = [];
    let items = req.body.order;
    for (let i = 0; i < items.length; i++) {
        supplyOrder.push(items[i].item_url);
    }
    checkout(form, supplyOrder)
    let success = "success"
    res.json(success);
}

async function deleteItem(req, res, next) {
    const { item_id } = req.body;
    const data = await service.deleteItem(item_id);
    res.status(200).json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
    delete: [
        itemExists,
        asyncErrorBoundary(deleteItem),
    ],
};