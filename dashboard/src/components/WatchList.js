import React, { useState, useContext } from "react";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  SwapVert,
  FilterList,
} from "@mui/icons-material";

import { DoughnutChart } from "./DoughnoutChart";


const WatchList = () => {
  const { watchlistData } = useContext(GeneralContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // price_h, price_l, chg_h, chg_l, name
  const [filterMode, setFilterMode] = useState("all"); // gainers, losers, all

  const processedList = [...watchlistData]
    .filter((stock) => {
      const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterMode === "gainers") return matchesSearch && !stock.isDown;
      if (filterMode === "losers") return matchesSearch && stock.isDown;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "price_h") return b.price - a.price;
      if (sortOrder === "price_l") return a.price - b.price;
      if (sortOrder === "chg_h") return parseFloat(b.percent) - parseFloat(a.percent);
      if (sortOrder === "chg_l") return parseFloat(a.percent) - parseFloat(b.percent);
      if (sortOrder === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const filteredWatchlist = processedList;

  const data = {
    labels: filteredWatchlist.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: filteredWatchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '15px 15px 10px 15px', borderBottom: '1px solid #f1f1f1' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search eg: infy, rel..."
            className="search"
            style={{ width: '100%', padding: '10px 40px 10px 12px', borderRadius: '4px', border: '1px solid #eee', fontSize: '13px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="counts" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: '#999' }}> 
            {filteredWatchlist.length} / 50
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            {/* Filter Pills */}
            {["all", "gainers", "losers"].map((f) => (
              <span 
                key={f}
                onClick={() => setFilterMode(f)}
                style={{ 
                  fontSize: '11px', fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize',
                  color: filterMode === f ? '#4184f3' : '#999',
                  borderBottom: filterMode === f ? '2px solid #4184f3' : 'none',
                  paddingBottom: '2px'
                }}
              >
                {f}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SwapVert style={{ fontSize: '16px', color: '#999' }} />
            <select 
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontSize: '11px', fontWeight: '500', color: '#666', cursor: 'pointer', outline: 'none' }}
            >
              <option value="">Sort by</option>
              <option value="name">Name A-Z</option>
              <option value="price_h">Price (High)</option>
              <option value="price_l">Price (Low)</option>
              <option value="chg_h">Gains %</option>
            </select>
          </div>
        </div>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="down" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const { openBuyWindow, openSellWindow, userRole } = useContext(GeneralContext);

  const handleBuyClick = () => {
    openBuyWindow(uid);
  };

  const handleSellClick = () => {
    openSellWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        {userRole === "Admin" && (
          <>
            <Tooltip
              title="Buy (B)"
              placement="top"
              arrow
              TransitionComponent={Grow}
              onClick={handleBuyClick}
            >
              <button className="buy">Buy</button>
            </Tooltip>
            <Tooltip
              title="Sell (S)"
              placement="top"
              arrow
              TransitionComponent={Grow}
              onClick={handleSellClick}
            >
              <button className="sell">Sell</button>
            </Tooltip>
          </>
        )}
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
