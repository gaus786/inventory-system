import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch(() => setError("Could not load dashboard data."));
  }, []);

  const cardStyle = {
    background: "white", borderRadius: "10px", padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)", minWidth: "150px"
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
        {[
          { label: "Total Products", value: data.total_products, color: "#3b82f6" },
          { label: "Total Customers", value: data.total_customers, color: "#10b981" },
          { label: "Total Orders", value: data.total_orders, color: "#f59e0b" },
          { label: "Low Stock Items", value: data.low_stock_products.length, color: "#ef4444" },
        ].map(({ label, value, color }) => (
          <div key={label} style={cardStyle}>
            <p style={{ color: "#6b7280", margin: 0 }}>{label}</p>
            <h2 style={{ color, margin: "5px 0 0" }}>{value}</h2>
          </div>
        ))}
      </div>

      <h2>⚠️ Low Stock Products (qty &lt; 10)</h2>
      {data.low_stock_products.length === 0 ? (
        <p>All products are well stocked!</p>
      ) : (
        <table style={{ background: "white", borderRadius: "8px", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ background: "#fef3c7" }}>
              <th style={th}>ID</th><th style={th}>Name</th><th style={th}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.low_stock_products.map((p) => (
              <tr key={p.id}>
                <td style={td}>{p.id}</td>
                <td style={td}>{p.name}</td>
                <td style={{ ...td, color: "#ef4444", fontWeight: "bold" }}>{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = { padding: "10px 15px", textAlign: "left", borderBottom: "1px solid #e5e7eb" };
const td = { padding: "10px 15px", borderBottom: "1px solid #e5e7eb" };