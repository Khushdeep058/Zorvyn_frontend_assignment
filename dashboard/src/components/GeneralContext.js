import React, { useState } from "react";
import ActionWindow from "./BuyActionWindow";
import { holdings, watchlist, positions } from "../data/data";
import { getRealTimePrices } from "../services/stockService";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  closeBuyWindow: () => {},
  userRole: "Admin",
  setUserRole: (role) => {},
  isAuthenticated: false,
  login: (email, password) => {},
  logout: () => {},
  orders: [],
  addOrder: (order) => {},
  holdingsData: [],
  watchlistData: [],
  positionsData: [],
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [actionMode, setActionMode] = useState("Buy");
  
  // Initialize from LocalStorage to persist across refreshes
  const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole") || "Admin");
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("isAuthenticated") === "true");
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("orders") || "[]"));
  const [userHoldings, setUserHoldings] = useState(() => JSON.parse(localStorage.getItem("userHoldings")) || holdings);
  const [positionsData, setPositionsData] = useState(() => JSON.parse(localStorage.getItem("positionsData")) || positions);
  const [watchlistData, setWatchlistData] = useState(watchlist);

  // Sync to LocalStorage whenever critical states change
  React.useEffect(() => {
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("userHoldings", JSON.stringify(userHoldings));
    localStorage.setItem("positionsData", JSON.stringify(positionsData));
  }, [userRole, isAuthenticated, orders, userHoldings, positionsData]);

  React.useEffect(() => {
    const updatePrices = async () => {
      console.log("Updating prices...");
      const realPrices = await getRealTimePrices();
      if (realPrices) {
          console.log("Prices received, updating state...");
          setWatchlistData((currentWatchlist) => {
          return currentWatchlist.map((item) => {
            const realStock = realPrices.find((p) => p.name === item.name);
            if (realStock) {
              return {
                ...item,
                price: realStock.price,
                percent: realStock.percent,
                isDown: realStock.isDown,
              };
            }
            return item;
          });
        });

        setUserHoldings((currentHoldings) => {
          return currentHoldings.map((item) => {
            const realStock = realPrices.find((p) => p.name === item.name);
            if (realStock) {
              const dayChange = (realStock.price - item.avg) / item.avg * 100;
              return {
                ...item,
                price: realStock.price,
                day: (realStock.isDown ? "-" : "+") + realStock.percent,
                net: (dayChange >= 0 ? "+" : "") + dayChange.toFixed(2) + "%",
                isLoss: realStock.isDown
              };
            }
            return item;
          });
        });

        setPositionsData((currentPositions) => {
          return currentPositions.map((item) => {
            const realStock = realPrices.find((p) => p.name === item.name);
            if (realStock) {
              return {
                ...item,
                price: realStock.price,
                day: (realStock.isDown ? "-" : "+") + realStock.percent,
                isLoss: realStock.isDown
              };
            }
            return item;
          });
        });
      }
    };

    updatePrices(); 
    const interval = setInterval(updatePrices, 65000); 
    return () => clearInterval(interval);
  }, []);

  const handleOpenActionWindow = (uid, mode) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setActionMode(mode);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const addOrder = (order) => {
    const { name, qty, price, mode } = order;
    const quantity = parseInt(qty);
    const unitPrice = parseFloat(price);

    const now = new Date();
    const timeStr = now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    
    setOrders((prev) => [...prev, { ...order, id: Date.now(), time: timeStr }]);

    
    setUserHoldings((prevHoldings) => {
      const existingStockIndex = prevHoldings.findIndex((s) => s.name === name);

      if (mode === "BUY") {
        if (existingStockIndex !== -1) {
          const updatedHoldings = [...prevHoldings];
          const stock = updatedHoldings[existingStockIndex];
          const totalQty = stock.qty + quantity;
          
          const newAvgPrice = (stock.qty * stock.avg + quantity * unitPrice) / totalQty;
          
          updatedHoldings[existingStockIndex] = {
            ...stock,
            qty: totalQty,
            avg: parseFloat(newAvgPrice.toFixed(2)),
          };
          return updatedHoldings;
        } else {
          return [
            ...prevHoldings,
            {
              name,
              qty: quantity,
              avg: unitPrice,
              price: unitPrice,
              net: "+0.00%",
              day: "+0.00%",
            },
          ];
        }
      } else if (mode === "SELL") {
        if (existingStockIndex !== -1) {
          const updatedHoldings = [...prevHoldings];
          const stock = updatedHoldings[existingStockIndex];
          const remainingQty = stock.qty - quantity;

          if (remainingQty <= 0) {
            return updatedHoldings.filter((_, i) => i !== existingStockIndex);
          } else {
            updatedHoldings[existingStockIndex] = {
              ...stock,
              qty: remainingQty,
            };
            return updatedHoldings;
          }
        }
      }
      return prevHoldings;
    });

   
    setPositionsData((prevPositions) => {
      const existingIndex = prevPositions.findIndex(p => p.name === name);
      const isBuy = mode === "BUY";
      
      if (existingIndex !== -1) {
        const updated = [...prevPositions];
        const p = updated[existingIndex];
        const newQty = isBuy ? p.qty + quantity : p.qty - quantity;
        
        if (newQty === 0) {
          return updated.filter((_, i) => i !== existingIndex);
        }
        
        updated[existingIndex] = {
          ...p,
          qty: newQty,
          avg: isBuy ? (p.qty * p.avg + quantity * unitPrice) / newQty : p.avg
        };
        return updated;
      } else {
        return [{
          product: "CNC",
          name,
          qty: quantity,
          avg: unitPrice,
          price: unitPrice,
          isLoss: false,
          day: "+0.00%"
        }, ...prevPositions];
      }
    });
  };

  const login = (email, password) => {
    if (email === "admin@gmail.com" && password === "admin123") {
      setUserRole("Admin");
      setIsAuthenticated(true);
      return true;
    } else if (email === "user@gmail.com" && password === "user123") {
      setUserRole("Viewer");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole("Admin");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("orders");
    localStorage.removeItem("userHoldings");
    window.location.reload(); 
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: (uid) => handleOpenActionWindow(uid, "Buy"),
        openSellWindow: (uid) => handleOpenActionWindow(uid, "Sell"),
        closeBuyWindow: handleCloseBuyWindow,
        userRole: userRole,
        setUserRole: setUserRole,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        orders: orders,
        addOrder: addOrder,
        holdingsData: userHoldings,
        watchlistData: watchlistData,
        positionsData: positionsData,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <ActionWindow uid={selectedStockUID} mode={actionMode} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
