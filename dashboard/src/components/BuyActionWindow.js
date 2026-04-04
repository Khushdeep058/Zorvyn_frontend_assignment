import React, { useState, useContext } from "react";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const ActionWindow = ({ uid, mode = "Buy" }) => {
  const { closeBuyWindow, addOrder } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const isSell = mode === "Sell";
  const themeColor = isSell ? "#ff5722" : "#4587f4";

  const handleActionClick = () => {
    addOrder({
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: mode.toUpperCase(),
    });

    closeBuyWindow();
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className={`container ${isSell ? "sell-mode" : ""}`} id="buy-window">
      <div className="header" style={{ backgroundColor: themeColor }}>
        <h3>{mode} {uid} x {stockQuantity} Qty</h3>
        <button className="close-btn" onClick={handleCancelClick}>&times;</button>
      </div>

      <div className="regular-order">
        <div className="order-type">
          <label className="radio-container">
            <input type="radio" name="order" defaultChecked />
            Intraday <span>MIS</span>
          </label>
          <label className="radio-container">
            <input type="radio" name="order" />
            Longterm <span>CNC</span>
          </label>
        </div>

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>

        <div className="order-options">
          <label><input type="radio" name="price-type" defaultChecked /> Market</label>
          <label><input type="radio" name="price-type" /> Limit</label>
        </div>
      </div>

      <div className="buttons">
        <div className="margin-info">
          Margin <span className="value">₹{(stockQuantity * stockPrice * 0.2).toFixed(2)}</span>
        </div>
        <div className="actions">
          <button 
            className="btn" 
            onClick={handleActionClick}
            style={{ backgroundColor: themeColor, color: "white" }}
          >
            {mode}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionWindow;
