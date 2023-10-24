import React, { useState } from 'react';
import Form from '../Form/Form';
import OrderScreen from '../OrderScreen/OrderScreen';
import logo from '../../utils/images/ThatsSip.png';

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    // Handles the inputs into the login form
    const handleChange = (event) => {
        event.preventDefault();
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="box">
                            <figure className="image is-128x128 has-image-centered">
                                <img src={logo} alt="That's Sip Logo" className="is-rounded" />
                            </figure>
                            <h1 className="title is-4 has-text-centered">Order Management System (OMS)</h1>
          
                            <Form
                                handleChange={handleChange}
                                form={form}
                            />

                            <OrderScreen
                                form={form}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}