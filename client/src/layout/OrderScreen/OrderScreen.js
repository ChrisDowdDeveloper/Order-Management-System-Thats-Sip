import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listItems, callBot, deleteItem } from "../../utils/api";
import ErrorAlert from "../../ErrorAlert";

export default function OrderScreen({ form }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState([]);
    const [order, setOrder] = useState([]);
    const [itemOrdered, setItemOrdered] = useState({});

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
    

    console.log(order)


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
        <div className="section">
            <div className="container">
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
                    {items.map(item => (
                        <div className="column is-one-third" key={item.item_id}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={item.item_jpg} alt="the item" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <p className="title is-4">{item.item_name}</p>
                                        <p className="subtitle is-6">Control: {item.item_control}</p>
                                        <p className="subtitle is-6">On Hand: </p>
                                        <input
                                            type="number"
                                            className="input"
                                            onChange={(e) => handleChange(e, item)}
                                            placeholder="Enter quantity"
                                        />
                                        <p className="subtitle is-6">To Order: {itemOrdered[item.item_id] || 0}</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a href="#" onClick={() => handleRemoveItem(item.item_id)} className="card-footer-item has-text-danger">
                                        Remove
                                    </a>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}    