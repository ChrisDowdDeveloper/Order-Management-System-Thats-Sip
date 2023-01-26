import React from "react";
import OrderScreen from "../OrderScreen/OrderScreen";


function Form({ handleChange, handleSubmit, form, items }) {
    return (
        <div className="card-body">
            <form>
                <div className="col-10 form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        className="form-control"
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={form.email || ""}
                        required
                    />
                </div>
                <div className="col-10 form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={form.password || ""}
                        required
                    />
                </div>
                <OrderScreen item={items} />
                <button onClick={handleSubmit} type="submit" className="btn btn-primary m-2">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;