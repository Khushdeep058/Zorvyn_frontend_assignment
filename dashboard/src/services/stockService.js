import axios from "axios";

// RECOMMENDED: Get your own free API key at https://twelvedata.com/
const API_KEY = "195b191207e14d94a5a6a24cd9700264"
const SYMBOLS_MAP = {
  INFY: "INFY:NSE",
  ONGC: "ONGC:NSE",
  TCS: "TCS:NSE",
  KPITTECH: "KPITTECH:NSE",
  QUICKHEAL: "QUICKHEAL:NSE",
  WIPRO: "WIPRO:NSE",
  "M&M": "M&M:NSE",
  RELIANCE: "RELIANCE:NSE",
  HUL: "HINDUNILVR:NSE",
  HINDUNILVR: "HINDUNILVR:NSE",
  BHARTIARTL: "BHARTIARTL:NSE",
  HDFCBANK: "HDFCBANK:NSE",
  ITC: "ITC:NSE",
  SBIN: "SBIN:NSE",
  TATAPOWER: "TATAPOWER:NSE",
  EVEREADY: "EVEREADY:NSE",
  JUBLFOOD: "JUBLFOOD:NSE",
};

const REVERSE_MAP = Object.fromEntries(
  Object.entries(SYMBOLS_MAP).map(([k, v]) => [v, k])
);

// Fallback simulator in case API key is missing or limit reached
const simulatePrice = (name, currentPrice) => {
  const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
  const newPrice = currentPrice + change;
  const percentChange = (change / currentPrice) * 100;
  return {
    name,
    price: parseFloat(newPrice.toFixed(2)),
    percent: (percentChange >= 0 ? "+" : "") + percentChange.toFixed(2) + "%",
    isDown: percentChange < 0
  };
};

export const getRealTimePrices = async () => {
  // Free tier limit: 8 stocks per minute. We'll take the top 8.
  const symbolsArray = Object.values(SYMBOLS_MAP).slice(0, 8);
  const symbols = symbolsArray.join(",");
  const url = `https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Handle single result (object) vs multiple (object of objects)
    const quotes = data.status === undefined ? data : { [data.symbol]: data };
    
    if (data.status === "error") {
      console.error("Twelve Data Error:", data.message);
      return null;
    }

    return Object.values(quotes).map((quote) => ({
      name: REVERSE_MAP[quote.symbol] || quote.symbol.split(":")[0],
      price: parseFloat(quote.close || quote.price || 0),
      percent: (parseFloat(quote.percent_change) >= 0 ? "+" : "") + quote.percent_change + "%",
      isDown: parseFloat(quote.percent_change) < 0,
    }));
  } catch (error) {
    console.error("Twelve Data fetch failed:", error.message);
    return null;
  }
};
