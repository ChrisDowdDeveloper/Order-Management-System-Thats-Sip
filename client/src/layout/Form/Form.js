import React from "react";


function Form({ handleChange, form }) {
    return (
        <form>
            <div className="field">
                <label htmlFor="email" className="label">Email</label>
                <div className="control">
                    <input
                        id="email"
                        type="text"
                        name="email"
                        className="input"
                        onChange={handleChange}
                        value={form.email || ""}
                        required
                    />
                </div>
            </div>
            <div className="field">
                <label htmlFor="password" className="label">Password</label>
                <div className="control">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="input"
                        onChange={handleChange}
                        value={form.password || ""}
                        required
                    />
                </div>
            </div>
        </form>
    );
}


export default Form;