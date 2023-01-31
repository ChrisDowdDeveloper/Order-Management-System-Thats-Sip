import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../../utils/api";
import FormError from "../FormError"
import "./addItem.css";


export default function AddItem() {
    const navigate = useNavigate();
    const [formError, setFormError] = useState([]);
    const [form, setForm] = useState({
        item_name: "",
        item_url: "",
        item_jpg: "",
    });

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
        try {
            await createItem(form, abortController.signal);
            navigate("/items");
        } catch (err) {
            setFormError([err.message]);
        }
        return () => abortController.abort();
    };


    return (
        <div>
            <FormError formError={formError} />
            <form>
                <label>Item Name:</label>
                <input
                    id="item_name"
                    className="itemName"
                    type="text"
                    name="item_name"
                    onChange={handleChange}
                    value={form.item_name || ""}
                    required
                />
                <label>Link to Item:</label>
                <input
                    id="item_url"
                    className="itemURL"
                    type="text"
                    name="item_url"
                    onChange={handleChange}
                    value={form.item_url || ""}
                    required
                />
                <label>Item Image Link:</label>
                <input
                    id="item_jpg"
                    className="itemJPG"
                    type="text"
                    name="item_jpg"
                    onChange={handleChange}
                    value={form.item_jpg || ""}
                />
                <button onClick={handleSubmit}>
                    Submit
                </button>
                <button onClick={() => navigate("/items")}>
                    Cancel
                </button>
            </form>
        </div>
    );
}