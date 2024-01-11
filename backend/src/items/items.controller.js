const service = require("./items.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const checkout = require("../../bot")

const VALID_FIELDS = [
    "item_name",
    "item_url",
    "item_jpg",
  ];

// Checks to see that the item with the item_id exists
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

// Checks to see if the form has an item_name, item_url, and item_jpg
async function formHasInputs(req, res, next) {
    const { data = {} } = req.body;
    try {
        VALID_FIELDS.forEach((fields) => {
            if(!data[fields]) {
                const error = new Error(`A '${fields}' is required.`);
                error.status = 400;
                throw error;
            }
        });
        next();
    } catch (error) {
        next(error);
    }
}

// Verifies that the URL is valid
async function urlIsValid(req, res, next) {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const url = req.body.data.item_url;
    if(!urlRegex.test(url)) {
        return next({
            status: 400,
            message: 'URL is not valid',
        });
    }
    return next();
}

// Lists all the products/supplies in the database
async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

// Creates the order and calls bot.js to begin the automation 
async function create(req, res) {
    let supplyOrder = [];
    let items = req.body.order;
    for (let i = 0; i < items.length; i++) {
        supplyOrder.push(items[i]);
    }
    checkout(supplyOrder)
    let success = "success"
    res.json(success);
}

// Creates a new product or supply item
async function createItem(req, res) {
    const { data } = req.body;
    const created = await service.create(data);
    res.status(201).json({ data: created });
}

// Deletes a product or supply item
async function deleteItem(req, res, next) {
    const item = req.body.item_id
    const data = await service.deleteItem(item);
    res.status(200).json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
    createItem: [
        formHasInputs,
        urlIsValid,
        asyncErrorBoundary(createItem),
    ],
    delete: [
        itemExists,
        asyncErrorBoundary(deleteItem),
    ],
};