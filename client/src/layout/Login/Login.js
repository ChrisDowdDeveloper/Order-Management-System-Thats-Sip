import React, { useState } from 'react';
import ErrorAlert from '../../ErrorAlert';
import Form from '../Form/Form';
import { callBot } from '../../utils/api';
import OrderScreen from '../OrderScreen/OrderScreen';

export default function Login() {
    const [error, setError] = useState([]);
    const [form, setForm] = useState({
        email: "",
        password: "",
    })


    const handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.name)
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
        } catch (err) {
            setError([err.message]);
        }
        return () => abortController.abort();
    }

    return (
        <div>
            <ErrorAlert error={error} />
            <Form
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                form={form}
            />
            <OrderScreen />
        </div >
    )
}