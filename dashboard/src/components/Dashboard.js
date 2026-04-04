import { Route, Routes, useLocation } from "react-router-dom";

import Portfolio from "./Portfolio";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";

const Dashboard = () => {
  const location = useLocation();
  
  // Pages where the WatchList sidebar should be visible
  const tradingPaths = ["/", "/orders", "/holdings", "/positions"];
  const showWatchList = tradingPaths.includes(location.pathname);

  return (
    <div className="dashboard-container">
      {showWatchList && <WatchList />}
      <div className={showWatchList ? "content" : "content-full"}>
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
