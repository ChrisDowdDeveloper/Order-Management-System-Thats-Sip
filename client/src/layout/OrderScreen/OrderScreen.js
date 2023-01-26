import React, { useEffect, useState } from "react";
import "./orderScreen.css";
import { listItems } from "../../utils/api";

export default function OrderScreen() {
    const [items, setItems] = useState([]);
    const [onHand, setOnHand] = useState(0);

    function loadItems() {
        const abortController = new AbortController();
        listItems(abortController.signal)
            .then(setItems);
        return () => abortController.abort();
    }

    useEffect(loadItems, []);

    const itemListSyrup = items.map(item => {
        if (item.item_type === "Syrups 750mL") {
            return (
                <div key={item.item_id}>
                    <p>{item.item_name}</p>
                    <img src={item.item_jpg} width="15%" alt="the item" />
                    <br />
                    <p>Control</p>
                    <p>{item.item_control}</p>
                    <br />
                    <p>On Hand</p>
                    <p>{onHand}</p>
                </div>
            )
        } else {
            return null;
        }
    })

    return (
        <div>
            {items.map(item => (
                <div className="border" key={item.item_id}>
                    {itemListSyrup}
                </div>
            ))}
        </div>
    )
}