const service = require("./items.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const checkout = require("../../bot")

async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

async function create(req, res) {
    let form = req.body.form;
    let temp = [];
    let items = req.body.order;
    for(let i = 0; i < items.length; i++) {
        temp.push(items[i].item_url);
    }
    checkout(form, temp)
    let success = "success"
    res.json(success);
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
}