import React, { useState } from 'react';
import ErrorAlert from '../../ErrorAlert';
import OrderScreen from "../OrderScreen/OrderScreen";
import Form from '../Form/Form';

export default function Login() {
    const [error, setError] = useState([]);
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

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
            <button onClick={handleSubmit} type="submit">Login</button>
        </div >
    )
}