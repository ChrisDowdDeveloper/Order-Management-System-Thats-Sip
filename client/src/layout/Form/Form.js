import React from "react";
import './form.css';


function Form({ handleChange, form }) {
    return (
        <form>
            <div className="email">
            <label htmlFor="email" className="form-label">Email</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={form.email || ""}
                    required
                />
            </div>
            <div className="password">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password || ""}
                    required
                />
            </div>
        </form>
    );
}

export default Form;