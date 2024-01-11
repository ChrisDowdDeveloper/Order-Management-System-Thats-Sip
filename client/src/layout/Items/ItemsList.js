import React from "react";


function Form({ items, handleChange, itemOrdered, handleRemoveItem }) {
    return (
        <div className="columns is-multiline">
                    {items.map(item => (
                        <div className="column is-one-third-desktop is-half-tablet is-full-mobile" key={item.itemId}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={item.itemJpg} alt="the item" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <p className="title is-5">{item.itemName}</p>
                                        <p className="subtitle is-7">Control: {item.itemControl}</p>
                                        <div className="inline">
                                            <p className="subtitle is-7">On Hand: </p>
                                            <input
                                                type="number"
                                                className="input is-small"
                                                onChange={(e) => handleChange(e, item)}
                                                placeholder="Enter quantity"
                                            />
                                        </div>
                                        <p className="subtitle is-7">To Order: {itemOrdered[item.itemIid] || 0}</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a href="/" onClick={() => handleRemoveItem(item.itemId)} className="card-footer-item has-text-danger">
                                        Remove
                                    </a>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>
    );
}


export default Form;