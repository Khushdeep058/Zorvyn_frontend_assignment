# Zorvyn Finance Dashboard 

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\u0026logoColor=white)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/MUI-7.3.9-007FFF?logo=mui\u0026logoColor=white)](https://mui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.7-FF5252?logo=framer\u0026logoColor=white)](https://www.framer.com/motion/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5.1-FF6384?logo=chartdotjs\u0026logoColor=white)](https://www.chartjs.org/)

**Zorvyn** is a high-fidelity, production-grade Finance Dashboard built with React 19. It provides an institutional-grade trading console experience, featuring real-time state management, role-based access control (RBAC), and sophisticated data visualizations tailored for the modern fintech landscape.

---

##  Key Features

###  Advanced Authentication (RBAC)
- **Role Switching**: Simulated "Admin" vs. "Viewer" permissions.
- **Secure Flow**: Full authentication lifecycle using React Context API for centralized state management.

###  Financial Intelligence
- **Portfolio Analytics**: Comprehensive breakdown of holdings, total investment vs. current value.
- **Dynamic Charting**: Interactive performance visualization using Chart.js (Doughnut \u0026 Vertical Graphs).
- **Watchlist Manager**: Real-time stock tracking with interactive hover states and quick actions.

###  Trading Execution
- **Buy Order System**: Integrated modal-based order execution with dynamic price calculation.
- **Transaction Ledger**: Persistent transaction history tracking with real-time updates across components.

###  Editorial-Grade UI/UX
- **Stripe-Inspired Design**: Professional glassmorphism, fluid Framer Motion animations, and a sleek color palette.
- **Responsive Layout**: Optimized for high-density desktop trading views.
- **Component-Driven**: Highly modular, reusable component architecture.

---

##  Tech Stack

- **Core Library**: React 19 (Hooks, Context, Portals)
- **State Management**: React Context API
- **Routing**: React Router 7
- **UI Frameworks**: Material UI (MUI) \u0026 Lucide React
- **Animations**: Framer Motion (Transitions \u0026 Gestures)
- **Data Visualization**: Chart.js \u0026 react-chartjs-2
- **Networking**: Axios for simulated API communication

---

##  Project Architecture

```text
dashboard/
├── src/
│   ├── components/       # Modular UI components (Atomic Design)
│   ├── data/             # Static \u0026 initial mock data sets
│   ├── services/         # Logic for API calls and data processing
│   ├── index.css         # Global design tokens \u0026 utility classes
│   └── index.js          # App entry with Context Providers
└── package.json          # Dependency \u0026 script management
```

---

##  Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn

### Installation
1. Clone the repository
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm start
   ```

---

##  Why My Project Stands Out 

- **Scalable Architecture**: Implemented a centralized state management pattern that avoids "Prop Drilling" and ensures high performance.
- **Complex UI Logic**: Solved the challenge of synchronized state between disparate components (e.g., executing a buy order immediately updating the Portfolio and Ledger).
- **Design Aesthetic**: Prioritizes user experience with subtle micro-animations and a color-theoretical approach to financial data representation.
- **Role Simulation**: Demonstrates an understanding of enterprise-level software requirements through RBAC implementation.


