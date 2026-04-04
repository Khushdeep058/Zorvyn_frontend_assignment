import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import { GetAppOutlined } from "@mui/icons-material";

const Positions = () => {
  const { positionsData } = useContext(GeneralContext);

  const downloadCSV = () => {
    const headers = ["Product", "Instrument", "Qty.", "Avg.", "LTP", "P&L", "Chg."];
    const rows = positionsData.map(stock => {
      const curValue = stock.price * stock.qty;
      const pandl = curValue - stock.avg * stock.qty;
      return [
        stock.product,
        stock.name,
        stock.qty,
        stock.avg.toFixed(2),
        stock.price.toFixed(2),
        pandl.toFixed(2),
        stock.day
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `positions_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 className="title">Positions ({positionsData.length})</h3>
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
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positionsData.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
