import React, { useEffect, useState } from "react";
import "./orderScreen.css";
import { listItems } from "../../utils/api";
import ErrorAlert from "../../ErrorAlert";

export default function OrderScreen() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState([]);

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
        order.push(item);
        console.log(order);
        console.log(order.length)
    }

    const handleDelete = (event) => {
        event.preventDefault();
        let index = order.findIndex(o => o.item_id === event.target.id);
        let removed = order.splice(index, 1);
        setError(`${event.target.name} removed`)
    }


    return (
        <div>
            <ErrorAlert error={error} />
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