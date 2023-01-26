import React, { useEffect, useState } from 'react';
import ErrorAlert from '../../ErrorAlert';
import { listItems } from "../../utils/api";
import Form from '../Form/Form';
import { callBot } from '../../utils/api';

export default function Login() {
    const [error, setError] = useState([]);
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    function loadItems() {
        const abortController = new AbortController();
        setError(null);
        listItems(abortController.signal)
            .then(setItems);
        return () => abortController.abort();
    }

    useEffect(loadItems, []);

    const handleChange = (event) => {
        event.preventDefault();
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            await callBot(form, abortController.signal);
        } catch(err) {
            setError([err.message]);
        }
        return () => abortController.abort();
    }


    const itemList = items.map((item) => {
        return (
            <div key={item.item_id}>
                <p>{item.item_name}</p>
            </div>
        )
    });
    return (
        <div>
            <ErrorAlert error={error} />
            <Form
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                form={form}
            />
            {itemList}
        </div >
    )
}