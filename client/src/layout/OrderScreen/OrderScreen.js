import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./orderScreen.css";
import { listItems, callBot, deleteItem } from "../../utils/api";
import ErrorAlert from "../../ErrorAlert";

export default function OrderScreen({ form }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState([]);
    const [order, setOrder] = useState([]);

    function loadItems() {
        const abortController = new AbortController();
        listItems(abortController.signal)
            .then(data => {
                console.log(data)
                setItems(data)
            });
        return () => abortController.abort();
    }

    useEffect(loadItems, []);


    const handleChange = (event, item) => {
        event.preventDefault();
        const quantity = parseInt(event.target.value, 10); // Get the inputted quantity
        // Create a new order array with the existing items
        const newOrder = [...order];

        // Push the item URL to the order array the specified number of times
        for (let i = 0; i < quantity; i++) {
            newOrder.push({
                item_name: item.item_name,
                item_url: item.item_url,
                item_id: item.item_id,
            });
        }

        // Update the order state variable
        setOrder(newOrder);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        // Extract only the URLs
        const orderUrls = order.map(item => item.item_url);

        try {
            console.log(orderUrls);
            await callBot(form, orderUrls, abortController.signal)
                .then(window.alert("Order has been placed and bot has been called. Review your cart on the website!"))
        } catch (err) {
            setError([err.message]);
        }
        setOrder([]);
        return () => abortController.abort();
    };

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

    return (
        <div className="height">
            <ErrorAlert error={error} />
            <button onClick={handleSubmit} type="submit" className="btn btn-primary m-2">
                Submit
            </button>
            <br />
            <button
                className="addButton"
            >
                <Link to="/items/new">
                    Add Items
                </Link>
            </button>
            <div className="itemsRow">
                {items.map(item => (
                    <div className="item" key={item.item_id}>
                        <div className="row">
                            <button
                                className="removeItem"
                                onClick={() => handleRemoveItem(item.item_id)}
                            >
                                X
                            </button>
                            <img src={item.item_jpg} className="productImage" alt="the item" />
                            <div className="column">
                                <h1 className="card-title">{item.item_name}</h1>
                                <p className="card-text">Control: {item.item_control}</p>
                                <div className="img-row">
                                    <input
                                        type="number"
                                        className="addToOrder"
                                        onChange={(e) => handleChange(e, item)}
                                        placeholder="Enter quantity"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}