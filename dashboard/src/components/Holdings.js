import React, { useContext } from "react";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";
import { GetAppOutlined } from "@mui/icons-material";

const Holdings = () => {
  const { userRole, holdingsData, openBuyWindow, openSellWindow } = useContext(GeneralContext);

  const downloadCSV = () => {
    const headers = ["Instrument", "Qty.", "Avg. Cost", "LTP", "Cur. Val", "P&L", "Net Chg.", "Day Chg."];
    const rows = holdingsData.map(stock => {
      const curValue = stock.price * stock.qty;
      const pandl = curValue - stock.avg * stock.qty;
      return [
        stock.name,
        stock.qty,
        stock.avg.toFixed(2),
        stock.price.toFixed(2),
        curValue.toFixed(2),
        pandl.toFixed(2),
        stock.net,
        stock.day
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `holdings_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const labels = holdingsData.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: holdingsData.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totalInvestment = holdingsData.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const currentValue = holdingsData.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);
  const totalPandL = currentValue - totalInvestment;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 className="title">Holdings ({holdingsData.length})</h3>
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
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              {userRole === "Admin" && <th style={{ textAlign: "left", paddingLeft: "15px" }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {holdingsData.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg ? stock.avg.toFixed(2) : "0.00"}</td>
                  <td>{stock.price ? stock.price.toFixed(2) : "0.00"}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                  {userRole === "Admin" && (
                    <td>
                      <div className="holding-actions" style={{ display: "flex", gap: "10px", justifyContent: "flex-start", paddingLeft: "15px" }}>
                        <button 
                          onClick={() => openBuyWindow(stock.name)}
                          style={{ padding: "6px 15px", fontSize: "11px", background: "#4caf50", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                        >
                          Buy
                        </button>
                        <button 
                          onClick={() => openSellWindow(stock.name)}
                          style={{ padding: "6px 15px", fontSize: "11px", background: "#ff5722", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                        >
                          Sell
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toLocaleString()}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toLocaleString()}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPandL >= 0 ? "profit" : "loss"}>{totalPandL.toLocaleString()}</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
