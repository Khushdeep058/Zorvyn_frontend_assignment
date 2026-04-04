import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import { GetAppOutlined } from "@mui/icons-material";

const Orders = () => {
  const { orders } = useContext(GeneralContext);

  const downloadCSV = () => {
    const headers = ["Instrument", "Qty.", "Price", "Mode", "Time"];
    const rows = orders.map(order => [
      order.name,
      order.qty,
      order.price,
      order.mode,
      order.time.replace(/,/g, "") 
    ].join(","));

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="title">Orders ({orders.length})</h3>
            <button 
              onClick={downloadCSV}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 16px', 
                backgroundColor: 'var(--stripe-blue, #635bff)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontSize: '0.85rem', 
                fontWeight: 600,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <GetAppOutlined sx={{ fontSize: 18 }} /> Download CSV
            </button>
          </div>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Mode</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price}</td>
                    <td style={{ color: order.mode === "BUY" ? "#4184f3" : "#ff5722", fontWeight: 500 }}>
                      {order.mode}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#999' }}>{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
