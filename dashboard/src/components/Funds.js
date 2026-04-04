import React from "react";
import { Link } from "react-router-dom";
import { 
  ExploreOutlined, 
  Inventory2Outlined, 
  ReceiptLongOutlined, 
  AutorenewOutlined, 
  HistoryOutlined, 
  CardGiftcardOutlined, 
  AutoGraphOutlined, 
  PublicOutlined, 
  AccountBalanceOutlined, 
  DashboardOutlined, 
  SettingsSystemDaydreamOutlined,
  VerifiedUserOutlined,
  EmojiObjectsOutlined
} from "@mui/icons-material";

const Funds = () => {
  const CategoryBox = ({ label }) => (
    <div className="category-box" style={{ 
      backgroundColor: "var(--bg-secondary)", 
      padding: "25px 30px", 
      borderRadius: "8px", 
      fontSize: "15px", 
      fontWeight: "500", 
      color: "var(--text-main)", 
      cursor: "pointer",
      textAlign: "center",
      border: "1px solid var(--border-subtle)",
      transition: "all 0.3s ease"
    }}>
      {label}
    </div>
  );

  const DetailedCard = ({ icon: Icon, title, desc, color }) => (
    <div className="detailed-card" style={{ 
      flex: 1,
      minWidth: "300px",
      backgroundColor: "var(--card-bg)", 
      padding: "24px", 
      borderRadius: "12px", 
      border: "1px solid var(--border-subtle)",
      display: "flex",
      gap: "16px",
      cursor: "pointer",
      transition: "all 0.3s ease"
    }}>
      <div style={{ 
        width: "48px", height: "48px", borderRadius: "10px", 
        backgroundColor: `${color}10`, color: color,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <Icon style={{ fontSize: "24px" }} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "600", color: "var(--text-main)" }}>{title}</h4>
        <p style={{ margin: 0, fontSize: "12px", color: "var(--text-dim)", lineHeight: "1.5" }}>{desc}</p>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "0 30px", backgroundColor: "var(--bg-primary)", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="funds-layout" style={{ display: "flex", gap: "40px", paddingTop: "30px" }}>
        
        <div className="funds-sidebar" style={{ flex: "0 0 260px" }}>
           <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "10px", marginBottom: "30px", backgroundColor: "var(--card-bg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 15px", backgroundColor: "var(--bg-secondary)", borderRadius: "8px", cursor: "pointer", marginBottom: "5px" }}>
                <DashboardOutlined style={{ color: "#ff5722", fontSize: "20px" }} />
                <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-main)" }}>Dashboard</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 15px", borderRadius: "8px", cursor: "pointer", marginBottom: "5px" }}>
                <Inventory2Outlined style={{ color: "#4184f3", fontSize: "20px" }} />
                <span style={{ fontSize: "14px", fontWeight: "400", color: "var(--text-dim)" }}>Mutual funds</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 15px", borderRadius: "8px", cursor: "pointer", marginBottom: "5px" }}>
                <VerifiedUserOutlined style={{ color: "#673ab7", fontSize: "20px" }} />
                <span style={{ fontSize: "14px", fontWeight: "400", color: "var(--text-dim)" }}>NPS (Beta)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 15px", borderRadius: "8px", cursor: "pointer" }}>
                <EmojiObjectsOutlined style={{ color: "#00bcd4", fontSize: "20px" }} />
                <span style={{ fontSize: "14px", fontWeight: "400", color: "var(--text-dim)" }}>Insurance by Ditto</span>
              </div>
           </div>

           <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "30px", textAlign: "center", backgroundColor: "var(--card-bg)" }}>
              <h5 style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "600", color: "var(--text-main)" }}>Ongoing NFOs</h5>
              <p style={{ fontSize: "12px", color: "var(--text-dim)", marginBottom: "20px", lineHeight: "1.5" }}>Invest in New Fund Offering (NFO) online.</p>
              <button style={{ 
                width: "100%", 
                backgroundColor: "#4184f3", 
                color: "#fff", 
                border: "none", 
                padding: "12px", 
                borderRadius: "8px", 
                fontWeight: "600", 
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#387ed1"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4184f3"}
              >
                Apply now
              </button>
           </div>
        </div>

       
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "50px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-main)", margin: "0 0 8px 0" }}>Get started</h3>
            <p style={{ fontSize: "14px", color: "var(--text-dim)", margin: "0 0 24px 0" }}>Find the right mutual funds for you across these categories</p>
            
            <div className="responsive-grid-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
              <CategoryBox label="Equity" />
              <CategoryBox label="Fund of Funds" />
              <CategoryBox label="Index funds" />
              <CategoryBox label="Debt" />
              <CategoryBox label="Hybrid" />
              <CategoryBox label="Solution oriented" />
            </div>
          </div>

          <div style={{ paddingBottom: "100px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-main)", margin: "0 0 8px 0" }}>Categories</h3>
            <p style={{ fontSize: "14px", color: "var(--text-dim)", margin: "0 0 24px 0" }}>Explore curated categories for specific financial goals</p>
            
            <div className="responsive-flex" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <DetailedCard 
                icon={CardGiftcardOutlined} 
                title="Save taxes" 
                desc="Build wealth & save tax with ELSS funds."
                color="#eb5757"
              />
              <DetailedCard 
                icon={AutoGraphOutlined} 
                title="Smart beta" 
                desc="Hybrid of active & passive investment strategies."
                color="#fb8c00"
              />
              <DetailedCard 
                icon={TrendingUpOutlined} 
                title="Low-cost index funds" 
                desc="Long term wealth creation at extremely low cost."
                color="#4caf50"
              />
              <DetailedCard 
                icon={PublicOutlined} 
                title="International funds" 
                desc="Diversify your portfolio globally with US/EU stocks."
                color="#1e88e5"
              />
              <DetailedCard 
                icon={AccountBalanceOutlined} 
                title="Alternatives to bank FDs" 
                desc="Tax efficient, better returns than standard FDs."
                color="#5e35b1"
              />
              <DetailedCard 
                icon={SettingsSystemDaydreamOutlined} 
                title="Equity & Debt" 
                desc="Stable income and growth balanced strategies."
                color="#ec407a"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const TrendingUpOutlined = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

export default Funds;
