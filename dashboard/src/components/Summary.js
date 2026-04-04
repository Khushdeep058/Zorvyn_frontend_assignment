import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const { userRole, holdingsData } = useContext(GeneralContext);

  const totalInvestment = holdingsData.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const currentValue = holdingsData.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);
  const totalPandL = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPandL / totalInvestment) * 100 : 0;

  // Portfolio Insights Logic
  const topStock = [...holdingsData].sort((a, b) => {
    const aGain = ((a.price - a.avg) / a.avg);
    const bGain = ((b.price - b.avg) / b.avg);
    return bGain - aGain;
  })[0];

  const profitStocks = holdingsData.filter(s => s.price >= s.avg);
  const lossStocks = holdingsData.filter(s => s.price < s.avg);

  const totalProfits = profitStocks.reduce((acc, s) => acc + (s.price - s.avg) * s.qty, 0);
  const totalLosses = Math.abs(lossStocks.reduce((acc, s) => acc + (s.price - s.avg) * s.qty, 0));

  return (
    <>
      <div className="username">
        <h6 style={{ color: 'var(--text-main)', fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>Hi, {userRole}!</h6>
        <hr className="divider" style={{ borderColor: 'var(--border-subtle)' }} />
      </div>

      <div className="section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '15px' }}>
          <span>
            <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-main)', fontSize: '16px' }}>Equity</p>
          </span>
          {userRole === "Admin" && (
            <Link to="/funds" className="btn btn-blue" style={{ padding: "6px 14px", fontSize: "12px", textDecoration: 'none', borderRadius: '4px' }}>
              Add Funds
            </Link>
          )}
        </div>

        <div className="data data-summary" style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <div className="first">
            <h3 style={{ margin: 0, fontSize: '28px', color: 'var(--text-main)', fontWeight: '600' }}>3.74k</h3>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-dim)', fontSize: '12px' }}>Margin available</p>
          </div>
          <hr style={{ height: '40px', borderLeft: '1px solid var(--border-subtle)', margin: '0 20px' }} />

          <div className="second">
            <p style={{ margin: '0 0 8px 0', color: 'var(--text-dim)', fontSize: '13px' }}>
              Margins used <span style={{ color: 'var(--text-main)', fontWeight: '600', marginLeft: '10px' }}>0</span>
            </p>
            <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '13px' }}>
              Opening balance <span style={{ color: 'var(--text-main)', fontWeight: '600', marginLeft: '10px' }}>3.74k</span>
            </p>
          </div>
        </div>
        <hr className="divider" style={{ borderColor: 'var(--border-subtle)', margin: '25px 0' }} />
      </div>

      <div className="section">
        <span>
          <p style={{ margin: '0 0 15px 0', fontWeight: '700', color: 'var(--text-main)', fontSize: '16px' }}>Holdings ({holdingsData.length})</p>
        </span>

        <div className="data data-summary" style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <div className="first">
            <h3 className={totalPandL >= 0 ? "profit" : "loss"} style={{ margin: 0, fontSize: '28px', fontWeight: '600' }}>
              {(totalPandL / 1000).toFixed(2)}k <small style={{ fontSize: '14px', marginLeft: '5px' }}>{(pnlPercent >= 0 ? "+" : "") + pnlPercent.toFixed(2)}%</small>
            </h3>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-dim)', fontSize: '12px' }}>P&L Today</p>
          </div>
          <hr style={{ height: '40px', borderLeft: '1px solid var(--border-subtle)', margin: '0 20px' }} />

          <div className="second">
            <p style={{ margin: '0 0 8px 0', color: 'var(--text-dim)', fontSize: '13px' }}>
              Current Value <span style={{ color: 'var(--text-main)', fontWeight: '600', marginLeft: '10px' }}>{(currentValue / 1000).toFixed(2)}k</span>
            </p>
            <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '13px' }}>
              Investment <span style={{ color: 'var(--text-main)', fontWeight: '600', marginLeft: '10px' }}>{(totalInvestment / 1000).toFixed(2)}k</span>
            </p>
          </div>
        </div>

        {/* Real-time Portfolio Breakdown Bar */}
        <div className="portfolio-bar" style={{
          height: '24px',
          display: 'flex',
          borderRadius: '4px',
          overflow: 'hidden',
          margin: '25px 0',
          background: 'var(--border-subtle)'
        }}>
          {holdingsData.map((stock, i) => {
            const width = (stock.price * stock.qty / currentValue) * 100;
            const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107'];
            return (
              <div key={i} title={`${stock.name}: ${width.toFixed(1)}%`} style={{
                width: `${width}%`,
                backgroundColor: colors[i % colors.length],
                transition: 'width 0.5s ease'
              }} />
            );
          })}
        </div>

        <hr className="divider" />
      </div>

      <div className="summary-row" style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
        {/* Market Chart (Left Column) */}
        <div className="section" style={{ flex: 2 }}>
          <p style={{ color: 'var(--text-main)', fontWeight: '700' }}>Market Overview</p>
          <div className="market-chart" style={{ height: '180px', background: 'var(--card-bg)', borderRadius: '8px', padding: '10px', position: 'relative', border: '1px solid var(--border-subtle)' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M0,80 Q25,70 40,85 T70,60 T100,50"
                fill="none"
                stroke="#4184f3"
                strokeWidth="2"
                className="line-animation"
              />
              <path
                d="M0,80 Q25,70 40,85 T70,60 T100,50 L100,100 L0,100 Z"
                fill="rgba(65, 132, 243, 0.1)"
              />
            </svg>
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '10px', color: 'var(--text-dim)' }}>
              NIFTY 50 Live
            </div>
          </div>
        </div>

        {/* Insights Table (Right Column) */}
        <div className="section" style={{ flex: 1 }}>
          <p style={{ color: 'var(--text-main)', fontWeight: '700' }}>Portfolio Insights</p>
          <div style={{ background: 'var(--card-bg)', borderRadius: '8px', padding: '15px', border: '1px solid var(--border-subtle)', height: '170px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <small style={{ color: 'var(--text-dim)' }}>Monthly Invested</small>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>₹{(totalInvestment / 1.1).toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <small style={{ color: 'var(--text-dim)' }}>Total Profits</small>
              <strong style={{ fontSize: '0.9rem', color: '#4caf50' }}>+₹{totalProfits.toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <small style={{ color: 'var(--text-dim)' }}>Total Losses</small>
              <strong style={{ fontSize: '0.9rem', color: '#f44336' }}>-₹{totalLosses.toFixed(2)}</strong>
            </div>
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', marginTop: '10px' }}>
              <small style={{ color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}> Top Performer</small>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{topStock?.name}</span>
                <span style={{ color: '#4caf50', fontWeight: 600 }}>+{(((topStock?.price - topStock?.avg) / topStock?.avg) * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
