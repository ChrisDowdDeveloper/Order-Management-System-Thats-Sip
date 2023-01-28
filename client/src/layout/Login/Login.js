import React, { useState } from 'react';
import Form from '../Form/Form';
import OrderScreen from '../OrderScreen/OrderScreen';

export default function Login() {
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

    return (
        <div>
            <Form
                handleChange={handleChange}
                form={form}
            />
            <OrderScreen 
                form={form}
            />
        </div >
    )
}