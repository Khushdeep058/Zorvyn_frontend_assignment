import React from "react";
import { DoughnutChart } from "./DoughnoutChart";
import { KeyboardArrowDown, TrendingUp, AccountBalanceWalletOutlined, PieChartOutline, LayersOutlined } from "@mui/icons-material";

const Portfolio = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState("Family Trust A/C");

  const accounts = ["Family Trust A/C", "Personal A/C", "Business A/C"];

 
  const accountMeta = {
    "Family Trust A/C": {
      netWorth: "4,82,90,500.42",
      invested: "3,52,10,000.00",
      unrealized: "+1,30,80,500 (+8.4%)",
      assetDist: [65, 20, 10, 5],
      sectors: [35, 25, 15, 15, 10],
      top: [
        { name: "Reliance Industries", price: "2,842.20", change: "12.4" },
        { name: "HDFC Bank", price: "1,652.45", change: "8.2" },
        { name: "Tata Consultancy", price: "3,412.10", change: "5.7" }
      ]
    },
    "Personal A/C": {
      netWorth: "82,45,200.15",
      invested: "65,10,000.00",
      unrealized: "+17,35,200 (+26.6%)",
      assetDist: [40, 30, 10, 20],
      sectors: [50, 10, 5, 20, 15],
      top: [
        { name: "Zomato Ltd", price: "182.40", change: "42.1" },
        { name: "Infosys", price: "1,555.45", change: "18.5" },
        { name: "Sovereign Gold Bond", price: "6,240.00", change: "12.2" }
      ]
    },
    "Business A/C": {
      netWorth: "2,14,30,800.00",
      invested: "2,05,00,000.00",
      unrealized: "+9,30,800 (+4.5%)",
      assetDist: [10, 10, 70, 10],
      sectors: [5, 60, 20, 5, 10],
      top: [
        { name: "SBI Bonds", price: "1,000.00", change: "5.2" },
        { name: "ICICI Bank", price: "942.10", change: "3.8" },
        { name: "Power Grid", price: "242.00", change: "2.1" }
      ]
    }
  };

  const current = accountMeta[selectedAccount];

  const assetData = {
    labels: ["Equity (MF)", "Direct Equity", "Fixed Income", "Gold"],
    datasets: [{
      data: current.assetDist,
      backgroundColor: ["#1a567eff", "#0d47a1", "#ac66ff", "#10b981"],
      borderWidth: 0,
      cutout: "75%",
      hoverOffset: 15
    }],
  };

  const sectorData = {
    labels: ["Tech", "Finance", "Energy", "Consumer", "Others"],
    datasets: [{
      data: current.sectors,
      backgroundColor: ["#000666", "#1a237e", "#3949ab", "#ac66ff", "#7986cb"],
      borderWidth: 0,
      cutout: "75%",
      hoverOffset: 15
    }],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const TopPerformer = ({ name, price, change, icon: Icon, color }) => (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      padding: "16px 20px", 
      backgroundColor: "var(--card-bg)", 
      borderRadius: "12px",
      marginBottom: "12px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      border: "1px solid var(--border-subtle)"
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#f8f9fa";
      e.currentTarget.style.transform = "translateX(5px)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "#fff";
      e.currentTarget.style.transform = "translateX(0)";
    }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div style={{ 
          width: "40px", height: "40px", borderRadius: "10px", 
          backgroundColor: `${color}15`, color: color,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon style={{ fontSize: "20px" }} />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: "600", color: "#191c1d", fontSize: "14px" }}>{name}</p>
          <p style={{ margin: 0, fontSize: "11px", color: "#767683", textTransform: "uppercase", letterSpacing: "0.5px" }}>Active Position</p>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ margin: 0, fontWeight: "600", color: "#191c1d", fontSize: "14px" }}>₹{price}</p>
        <p style={{ margin: 0, fontSize: "12px", color: "#10b981", fontWeight: "600" }}>+{change}%</p>
      </div>
    </div>
  );

  return (
    <div style={{ 
      padding: "0 30px", 
      backgroundColor: "var(--bg-primary)", 
      minHeight: "100vh", 
      fontFamily: "'Inter', sans-serif",
      color: "var(--text-main)"
    }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "30px 0" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", margin: 0, letterSpacing: "-0.5px" }}>Portfolio Overview</h1>
        <div style={{ position: "relative" }}>
          <div 
            onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
            style={{ 
              display: "flex", alignItems: "center", gap: "10px", 
              backgroundColor: "var(--card-bg)", backdropFilter: "blur(10px)",
              padding: "8px 16px", borderRadius: "30px", border: "1px solid var(--border-subtle)",
              cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
            }}
          >
            <AccountBalanceWalletOutlined style={{ fontSize: "18px", color: "#000666" }} />
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#000666" }}>{selectedAccount}</span>
            <KeyboardArrowDown style={{ fontSize: "18px", color: "#000666", transform: isAccountDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </div>

          {isAccountDropdownOpen && (
            <div style={{ 
              position: "absolute", top: "45px", right: 0, width: "180px", 
              backgroundColor: "white", borderRadius: "12px", border: "1px solid #eee", 
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 100, overflow: "hidden" 
            }}>
              {accounts.map(acc => (
                <div 
                  key={acc}
                  onClick={() => { setSelectedAccount(acc); setIsAccountDropdownOpen(false); }}
                  style={{ 
                    padding: "12px 16px", fontSize: "13px", fontWeight: "500", color: "#333",
                    cursor: "pointer", transition: "background 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
                >
                  {acc}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      
      <div style={{ 
        background: "linear-gradient(135deg, #000666 0%, #1a237e 100%)", 
        padding: "40px", borderRadius: "24px", color: "#fff",
        boxShadow: "0 20px 40px rgba(0,6,102,0.15)",
        position: "relative", overflow: "hidden",
        marginBottom: "40px"
      }}>
        
        <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }}></div>
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", opacity: 0.8, textTransform: "uppercase", letterSpacing: "1px" }}>Total Net Worth</p>
          <h2 style={{ margin: "10px 0 30px 0", fontSize: "42px", fontWeight: "700", letterSpacing: "-1px" }}>₹{current.netWorth}</h2>
          
          <div style={{ display: "flex", gap: "60px" }}>
            <div>
              <p style={{ margin: "0 0 5px 0", fontSize: "12px", opacity: 0.8 }}>Invested Capital</p>
              <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>₹{current.invested}</h4>
            </div>
            <div>
              <p style={{ margin: "0 0 5px 0", fontSize: "12px", opacity: 0.8 }}>Unrealized Gain</p>
              <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#10b981" }}>{current.unrealized}</h4>
            </div>
          </div>
        </div>
        
        <div style={{ position: "absolute", bottom: "30px", right: "40px" }}>
          <TrendingUp style={{ fontSize: "60px", opacity: 0.1 }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "30px", marginBottom: "40px" }}>
        
        <div style={{ flex: 2, backgroundColor: "var(--card-bg)", borderRadius: "20px", padding: "30px", border: "1px solid var(--border-subtle)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
            <PieChartOutline style={{ color: "#4184f3" }} />
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "var(--text-main)" }}>Asset Allocation</h3>
          </div>
          
          <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
            <div style={{ width: "220px" }}>
              <DoughnutChart data={assetData} options={chartOptions} />
            </div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {assetData.labels.map((label, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "3px", backgroundColor: assetData.datasets[0].backgroundColor[i] }}></div>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#454652" }}>{label}</span>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#191c1d", marginLeft: "auto" }}>{assetData.datasets[0].data[i]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div style={{ flex: 1, backgroundColor: "var(--card-bg)", borderRadius: "20px", padding: "30px", border: "1px solid var(--border-subtle)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
            <LayersOutlined style={{ color: "#4184f3" }} />
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "var(--text-main)" }}>Top Sectors</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {sectorData.labels.map((label, i) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>{label}</span>
                  <span style={{ fontSize: "12px", color: "#767683" }}>{sectorData.datasets[0].data[i]}%</span>
                </div>
                <div style={{ height: "4px", backgroundColor: "#f0f1f2", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ 
                    height: "100%", width: `${sectorData.datasets[0].data[i]}%`, 
                    backgroundColor: sectorData.datasets[0].backgroundColor[i], borderRadius: "2px" 
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers Section */}
      <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>Top Performing Assets</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", paddingBottom: "50px" }}>
        {current.top.map((s) => (
          <TopPerformer key={s.name} name={s.name} price={s.price} change={s.change} icon={TrendingUp} color="#000666" />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
