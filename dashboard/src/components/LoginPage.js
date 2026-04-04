import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldOutlined, 
  LoginOutlined, 
  InfoOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  ArrowForwardOutlined
} from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(GeneralContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer"); 
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    setError("");

    // Use the context login function
    const success = login(email, password);
    
    if (success) {
      navigate("/");
    } else {
      setError("Access Denied: Please check credentials and role.");
    }
  };

  const logo = "/zorvyn_logo.jpg";

  return (
    <div className="login-viewport">
      
      
      <div className="login-branding-container">
         <div className="login-logo-box">
            <img src={logo} alt="Z" />
         </div>
         <span className="login-brand-name">zorvyn</span>
      </div>

      <div className="login-card-anchor">
        <div className="login-card-content">
          <h1 className="login-title">Sign in to your account</h1>

          <form onSubmit={handleAuth} className="login-form">
            <div className="login-input-group">
              <label className="input-label">Email</label>
              <div className="login-input-wrapper">
                <input 
                  type="email" 
                  className="login-input-field" 
                  placeholder="Enter your E-mail" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="login-input-group">
              <label className="input-label">Password</label>
              <div className="login-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="login-input-field" 
                  placeholder="Enter your Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <div 
                  className="login-input-toggle"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword ? <VisibilityOffOutlined sx={{ fontSize: 18 }} /> : <VisibilityOutlined sx={{ fontSize: 18 }} />}
                </div>
              </div>
              <div className="login-forgot-link">
                <span>Forgot your password?</span>
              </div>
            </div>

            <div className="login-input-group">
               <label className="input-label">Execution Role</label>
               <div className="role-selector-stripe">
                 <button 
                   type="button" 
                   onClick={() => setRole("admin")} 
                   className={`role-tab-btn ${role === "admin" ? "active" : ""}`}
                 >
                   <ShieldOutlined sx={{ fontSize: 16 }} /> Admin
                 </button>
                 <button 
                   type="button" 
                   onClick={() => setRole("viewer")} 
                   className={`role-tab-btn ${role === "viewer" ? "active" : ""}`}
                 >
                   <LoginOutlined sx={{ fontSize: 16 }} /> Viewer
                 </button>
               </div>
            </div>

            {error && (
              <div className="login-error-toast">
                <InfoOutlined sx={{ fontSize: 16 }} /> {error}
              </div>
            )}

            <button type="submit" className="btn-login-v5">
              Continue <ArrowForwardOutlined sx={{ fontSize: 18, marginLeft: '8px' }} />
            </button>
          </form>

          <div className="hint-box-v5">
            <div className="hint-line">Executive Access: admin@gmail.com | user@gmail.com</div>
            <div className="hint-line">Private Keys: admin123 | user123</div>
          </div>
        </div>
      </div>

      <div className="login-footer-v5">
        <span>© Zorvyn Terminal</span>
        <div className="footer-links">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Security</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
