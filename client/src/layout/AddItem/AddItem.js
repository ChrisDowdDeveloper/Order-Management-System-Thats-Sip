import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../../utils/api";
import FormError from "../FormError"


export default function AddItem() {
    const navigate = useNavigate();
    const [formError, setFormError] = useState([]);
    const [form, setForm] = useState({
        item_name: "",
        item_url: "",
        item_jpg: "",
    });

    // Handles the data entered into the form fields for the new item
    const handleChange = (event) => {
        event.preventDefault();
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    // Calls the createItem() function in api.js to create the item
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            await createItem(form, abortController.signal);
            navigate("/");
        } catch (err) {
            setFormError([err.message]);
        }
        return () => abortController.abort();
    };


    return (
        <div className="section">
            <div className="container">
                <FormError formError={formError} />
                <form>
                    <div className="field">
                        <label className="label">Item Name:</label>
                        <div className="control">
                            <input
                                id="item_name"
                                className="input"
                                type="text"
                                name="item_name"
                                onChange={handleChange}
                                value={form.item_name || ""}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Link to Item:</label>
                        <div className="control">
                            <input
                                id="item_url"
                                className="input"
                                type="text"
                                name="item_url"
                                onChange={handleChange}
                                value={form.item_url || ""}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Item Image Link:</label>
                        <div className="control">
                            <input
                                id="item_jpg"
                                className="input"
                                type="text"
                                name="item_jpg"
                                onChange={handleChange}
                                value={form.item_jpg || ""}
                            />
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button onClick={handleSubmit} className="button is-link">
                                Submit
                            </button>
                        </div>
                        <div className="control">
                            <button onClick={() => navigate("/")} className="button is-light">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}