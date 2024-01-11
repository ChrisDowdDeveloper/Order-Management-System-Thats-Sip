import React from 'react';
import OrderScreen from '../OrderScreen/OrderScreen';
import logo from '../../utils/images/ThatsSip.png';

export default function Login() {
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
                            <OrderScreen />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}