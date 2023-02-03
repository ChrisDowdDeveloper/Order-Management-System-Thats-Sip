import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./orderScreen.css";
import { listItems, callBot, deleteItem } from "../../utils/api";
import ErrorAlert from "../../ErrorAlert";
import trashCan from '../../utils/icons/trash-outline.svg';
import cart from '../../utils/icons/cart-outline.svg';

export default function OrderScreen({ form }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState([]);
    const [orderSize, setOrderSize] = useState(0);
    let order = [];

    function loadItems() {
        const abortController = new AbortController();
        listItems(abortController.signal)
            .then(setItems);
        return () => abortController.abort();
    }

    useEffect(loadItems, []);


    const handleChange = (event) => {
        event.preventDefault();
        window.alert(`Item added: ${event.target.name}`);
        let item = {
            item_name: event.target.name,
            item_url: event.target.value,
            item_id: event.target.id,
        }
        order.push(item)
    }

    const handleDelete = (event) => {
        event.preventDefault();
        window.alert(`Item removed: ${event.target.name}`);
        let index = order.findIndex(o => o.item_id === event.target.id);
        order.splice(index, 1);
        setError(`${event.target.name} removed`);
        if (orderSize > 0) {
            setOrderSize(orderSize - 1);
        } else {
            setOrderSize(0);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            console.log(order);
            await callBot(form, order, abortController.signal)
                .then(window.alert("Order has been placed and bot has been called. Review your cart on the website!"))
                .then(order = []);
        } catch (err) {
            setError([err.message]);
        }
        return () => abortController.abort();
    }

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
                                        type="image"
                                        src={trashCan}
                                        className="removeFromOrder"
                                        onClick={handleDelete}
                                        value={item.item_url}
                                        id={item.item_id}
                                        name={item.item_name}
                                        alt="remove from order"
                                    />
                                    <input
                                        type="image"
                                        src={cart}
                                        className="addToOrder"
                                        onClick={handleChange}
                                        value={item.item_url}
                                        id={item.item_id}
                                        name={item.item_name}
                                        alt="add to order"
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