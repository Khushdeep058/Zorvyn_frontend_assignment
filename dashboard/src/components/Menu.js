import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import GeneralContext from "./GeneralContext";

import { LogoutOutlined, LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const { userRole, logout } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    if (newTheme) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, [isDarkMode]);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="/zorvyn_logo.jpg" style={{ width: "30px", height: "30px", borderRadius: "4px", objectFit: "cover" }} alt="Logo" />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/portfolio"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Portfolio
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div style={{ padding: "0 10px", margin: "20px 0", display: "flex", alignItems: "center", gap: "25px" }}>
           <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="avatar" style={{ 
              background: userRole === "Admin" ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" : "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)", 
              color: "white",
              width: "30px", height: "30px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              {userRole === "Admin" ? "AD" : "VW"}
            </div>
            <p className="username" style={{ fontWeight: "500", fontSize: "14px", margin: 0, color: "var(--text-main)" }}>{userRole}</p>
          </div>

          {/* Theme Toggle Button */}
          <div 
            onClick={toggleTheme}
            style={{ 
              cursor: "pointer", 
              width: "36px", height: "36px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
              color: isDarkMode ? "#ffc107" : "#000666",
              transition: "all 0.3s ease",
              border: `1px solid ${isDarkMode ? "#444" : "#ddd"}`,
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {isDarkMode ? <LightModeOutlined style={{ fontSize: "18px" }} /> : <DarkModeOutlined style={{ fontSize: "18px" }} />}
          </div>
          
          <button 
            onClick={handleLogoutClick} 
            style={{ 
              backgroundColor: "#eef6ff", 
              border: "1px solid #d0e4ff", 
              padding: "6px 14px", 
              borderRadius: "6px", 
              fontSize: "12px", 
              fontWeight: "600",
              color: "#387ed1", 
              cursor: "pointer", 
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex", 
              alignItems: "center", 
              gap: "6px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#387ed1";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "#387ed1";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(56, 126, 209, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#eef6ff";
              e.currentTarget.style.color = "#387ed1";
              e.currentTarget.style.borderColor = "#d0e4ff";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
            }}
          >
            <LogoutOutlined style={{ fontSize: "16px" }} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
