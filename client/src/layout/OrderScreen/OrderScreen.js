import React, { useEffect, useState } from "react";
import "./orderScreen.css";
import { listItems } from "../../utils/api";
import ErrorAlert from "../../ErrorAlert";
import { callBot } from '../../utils/api';
import trashCan from '../../utils/icons/trash-outline.svg';
import cart from '../../utils/icons/cart-outline.svg';
import AddItem from "../AddItem/AddItem";

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
        let item = {
            item_name: event.target.name,
            item_url: event.target.value,
            item_id: event.target.id,
        }
        order.push(item)
        console.log(order.length);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        let index = order.findIndex(o => o.item_id === event.target.id);
        order.splice(index, 1);
        setError(`${event.target.name} removed`);
        if(orderSize > 0) {
            setOrderSize(orderSize - 1);
        } else {
            setOrderSize(0);
        }
        console.log(order);
        console.log(order.length)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            console.log(order)
            await callBot(form, order, abortController.signal);
            console.log("bot called")
        } catch (err) {
            setError([err.message]);
        }
        return () => abortController.abort();
    }

    const handleRemoveItem = async (item) => {
        const abortController = new AbortController();
        try {
            if(window.confirm("Are you sure you want to remove this item?")) {
                await deleteItem( item.id, abortController.signal)
                    .then(window.location.reload());
            }
        } catch(err) {
            setError(err)
        }
        return () => abortController.abort();
    };

    return (
        <div>
            <ErrorAlert error={error} />
            <button onClick={handleSubmit} type="submit" className="btn btn-primary m-2">
                    Submit
            </button>
            <AddItem />
            {items.map(item => (
                <div key={item.item_id}>
                    <div className="card mb-3" style={{maxWidth: 400 + 'px'}}>
                        <div className="row g-0">
                            <button
                                className="removeItem"
                                onClick={handleRemoveItem}
                            >
                                X
                            </button>
                            <div className="col-md-4">
                                <img src={item.item_jpg} width="90%" className="img-fluid rounded-start" alt="the item" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
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
                    </div>
                </div>
            ))}
        </div>
    )
}