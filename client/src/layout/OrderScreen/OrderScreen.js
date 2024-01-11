import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listItems, callBot, deleteItem } from "../../utils/api";
import ErrorAlert from "../../ErrorAlert";
import "./orderScreen.css"
import ItemsList from "../Items/ItemsList";

export default function OrderScreen() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState([]);
    const [order, setOrder] = useState([]);
    const [itemOrdered, setItemOrdered] = useState({});
    // Loads all items in the database
    function loadItems() {
        const abortController = new AbortController();
        listItems(abortController.signal)
            .then(data => {
                setItems(data)
            });
        return () => abortController.abort();
    }

    useEffect(loadItems, []);

    const handleChange = (event, item) => {
        event.preventDefault();
        const onHand = parseInt(event.target.value);
        const toOrder = item.item_control - onHand;
    
        // Create a new copy of the existing order array
        let newOrder = [...order];
    
        // Remove the current item from the newOrder array
        newOrder = newOrder.filter(orderItem => orderItem.item_id !== item.item_id);
    
        // If we still need more of this item (toOrder > 0), then add it to the newOrder array
        if (toOrder > 0) {
            for (let i = 0; i < toOrder; i++) {
                newOrder.push({
                    item_name: item.item_name,
                    item_url: item.item_url,
                    item_id: item.item_id,
                });
            }
        }
    
        // Update the itemOrdered and order state variables
        setItemOrdered({
            ...itemOrdered,
            [item.item_id]: toOrder > 0 ? toOrder : 0,
        });
        setOrder(newOrder);
    };

    // Handles when the order is called by the submit button being pressed
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        // Extract only the URLs
        const orderUrls = order.map(item => item.item_url);

        // Calls the Selenium WebDriver in the backend to start the automation
        try {
            await callBot(orderUrls, abortController.signal)
                .then(window.alert("Order has been placed and bot has been called. Review your cart on the website!"))
        } catch (err) {
            setError([err.message]);
        }
        setOrder([]);
        return () => abortController.abort();
    };

    // Handles the deletion of a product or supply item
    const handleRemoveItem = async (item_id) => {
        const abortController = new AbortController();
        try {
            if (window.confirm("Are you sure you want to remove this item?")) {
                await deleteItem(item_id, abortController.signal)
                    .then(window.location.reload());
            }
        } catch (err) {
            setError(err)
        }
        return () => abortController.abort();
    };

    let sugarFree = items.filter(item => item.itemSubType === "sugarFree");
    let fruit = items.filter(item => item.itemSubType === "fruit");
    let regular = items.filter(item => item.itemSubType === "regular");
    let puree = items.filter(item => item.itemSubType === "puree");
    let mocha = items.filter(item => item.itemSubType === "mocha");
    let frappe = items.filter(item => item.itemSubType === "frappe");
    let sauce = items.filter(item => item.itemSubType === "sauce");
    let supplies = items.filter(item => item.itemSubType === "supplies");
    let cups = items.filter(item => item.itemSubType === "cups");
    let straws = items.filter(item => item.itemSubType === "straws");
    let sugarPackets = items.filter(item => item.itemSubType === "sugarPackets");

    return (
        <div className="section">
            <div className="container container-wide">
                <ErrorAlert error={error} />
                <div className="buttons">
                    <button onClick={handleSubmit} className="button is-primary">
                        Submit
                    </button>
                    <Link to="/items/new" className="button is-info">
                        Add Items
                    </Link>
                </div>
                <div className="columns is-multiline">
                    <div className="column is-12">
                        <h2 className="title is-3">Sugar Free</h2>
                        <ItemsList items = {sugarFree} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem}/>
                    </div>
                    <div className="column is-12">
                        <h2 className="title is-3">Fruit</h2>
                        <ItemsList items = {fruit} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                    <div className="column is-12">
                        <h2 className="title is-3">Regular</h2>
                        <ItemsList items = {regular} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                    <div className="column is-12">    
                        <h2 className="title is-3">Puree</h2>
                        <ItemsList items = {puree} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                    <div className="column is-12">
                        <h2 className="title is-3">Mocha</h2>
                        <ItemsList items = {mocha} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                    <div className="column is-12">
                        <h2 className="title is-3">Frappe</h2>
                        <ItemsList items = {frappe} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                    <div className="column is-12">
                        <h2 className="title is-3">Sauce</h2>
                        <ItemsList items = {sauce} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                    <div className="column is-12">
                        <h2 className="title is-3">Supplies</h2>
                        <ItemsList items = {supplies} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                    <div className="column is-12">
                        <h2 className="title is-3">Cups</h2>
                        <ItemsList items = {cups} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                    <div className="column is-12">
                        <h2 className="title is-3">Straws</h2>
                        <ItemsList items = {straws} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                    <div className="column is-12">
                        <h2 className="title is-3">Sugar Packets</h2>
                        <ItemsList items = {sugarPackets} handleChange = {handleChange} itemOrdered = {itemOrdered} handleRemoveItem = {handleRemoveItem} />
                    </div>
                </div>
            </div>
        </div>
    );
}    