import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <nav style={{
        width: "220px", background: "#1e293b", color: "white",
        padding: "20px", display: "flex", flexDirection: "column", gap: "10px"
      }}>
        <h2 style={{ color: "#38bdf8", marginBottom: "20px" }}>📦 InvManager</h2>
        {[
          { to: "/", label: "🏠 Dashboard" },
          { to: "/products", label: "📦 Products" },
          { to: "/customers", label: "👤 Customers" },
          { to: "/orders", label: "🧾 Orders" },
        ].map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === "/"}
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "#cbd5e1",
              textDecoration: "none", padding: "8px 12px",
              borderRadius: "6px", background: isActive ? "#0f172a" : "transparent"
            })}>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "30px", background: "#f1f5f9" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;