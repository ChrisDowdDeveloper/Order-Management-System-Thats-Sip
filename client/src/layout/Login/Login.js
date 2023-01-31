import React, { useState } from 'react';
import Form from '../Form/Form';
import OrderScreen from '../OrderScreen/OrderScreen';
import logo from '../../utils/images/ThatsSip.png';
import './login.css';

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
            <img src={logo} alt="That's Sip Logo" className='logo'/>
            <h1>Order Management System(OMS)</h1>
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