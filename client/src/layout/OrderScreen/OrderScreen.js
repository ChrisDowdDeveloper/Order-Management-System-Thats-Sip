import React, { useEffect, useState } from "react";
import "./orderScreen.css";
import { listItems } from "../../utils/api";
import ErrorAlert from "../../ErrorAlert";
import { callBot } from '../../utils/api';

export default function OrderScreen({ form }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState([]);
    const [orderSize, setOrderSize] = useState(0);
    console.log(form)

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
            console.log("Calling bot with: " + form + " " + order)
            await callBot(form, order, abortController.signal);
            console.log("bot called")
        } catch (err) {
            setError([err.message]);
        }
        return () => abortController.abort();
    }

    return (
        <div>
            <ErrorAlert error={error} />
            <button onClick={handleSubmit} type="submit" className="btn btn-primary m-2">
                    Submit
            </button>
            {items.map(item => (
                <div className="border" key={item.item_id}>
                    <p>{item.item_name}</p>
                    <img src={item.item_jpg} width="15%" alt="the item" />
                    <br />
                    <p>Control</p>
                    <p>{item.item_control}</p>
                    <br />
                    <button
                        onClick={handleDelete}
                        value={item.item_url}
                        id={item.item_id}
                        name={item.item_name}
                    >
                        Remove from Order
                    </button>
                    <button
                        onClick={handleChange}
                        value={item.item_url}
                        id={item.item_id}
                        name={item.item_name}
                    >
                        Add to Order
                    </button>
                </div>
            ))}
        </div>
    )
}