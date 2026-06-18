import { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([{ product_id: "", quantity: "" }]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const load = () => {
    API.get("/orders").then((r) => setOrders(r.data));
    API.get("/customers").then((r) => setCustomers(r.data));
    API.get("/products").then((r) => setProducts(r.data));
  };
  useEffect(() => { load(); }, []);

  const updateItem = (i, field, val) => {
    const copy = [...items];
    copy[i][field] = val;
    setItems(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");
    const payload = {
      customer_id: parseInt(customerId),
      items: items.map((i) => ({ product_id: parseInt(i.product_id), quantity: parseInt(i.quantity) })),
    };
    try {
      await API.post("/orders", payload);
      setMsg("Order placed successfully!");
      setCustomerId("");
      setItems([{ product_id: "", quantity: "" }]);
      load();
    } catch (err) {
      setError(err.response?.data?.detail || "Error occurred");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Cancel this order?")) return;
    await API.delete(`/orders/${id}`);
    load();
  };

  return (
    <div>
      <h1>🧾 Orders</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>Create New Order</h3>
        {msg && <p style={{ color: "green" }}>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <select value={customerId} required onChange={(e) => setCustomerId(e.target.value)} style={inputStyle}>
          <option value="">-- Select Customer --</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.full_name} ({c.email})</option>
          ))}
        </select>

        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "10px" }}>
            <select value={item.product_id} required
              onChange={(e) => updateItem(i, "product_id", e.target.value)} style={inputStyle}>
              <option value="">-- Select Product --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name} (Stock: {p.quantity}) - ₹{p.price}</option>
              ))}
            </select>
            <input type="number" min="1" placeholder="Qty" value={item.quantity} required
              onChange={(e) => updateItem(i, "quantity", e.target.value)} style={{ ...inputStyle, width: "80px" }} />
            {items.length > 1 && (
              <button type="button" onClick={() => setItems(items.filter((_, idx) => idx !== i))}
                style={btnStyle("#ef4444", "sm")}>✕</button>
            )}
          </div>
        ))}

        <button type="button" onClick={() => setItems([...items, { product_id: "", quantity: "" }])}
          style={btnStyle("#6b7280")}>+ Add Product</button>
        <button type="submit" style={btnStyle("#f59e0b")}>Place Order</button>
      </form>

      <table style={{ background: "white", borderRadius: "8px", borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#fffbeb" }}>
            {["ID", "Customer ID", "Total", "Status", "Date", "Action"].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td style={td}>{o.id}</td>
              <td style={td}>{o.customer_id}</td>
              <td style={td}>₹{o.total_amount.toFixed(2)}</td>
              <td style={td}>{o.status}</td>
              <td style={td}>{new Date(o.created_at).toLocaleDateString()}</td>
              <td style={td}>
                <button onClick={() => handleDelete(o.id)} style={btnStyle("#ef4444", "sm")}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const formStyle = { background: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "500px" };
const inputStyle = { padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", flex: 1 };
const btnStyle = (bg, size) => ({ background: bg, color: "white", border: "none", padding: size === "sm" ? "5px 10px" : "10px 20px", borderRadius: "6px", cursor: "pointer" });
const th = { padding: "10px 15px", textAlign: "left", borderBottom: "1px solid #e5e7eb" };
const td = { padding: "10px 15px", borderBottom: "1px solid #e5e7eb" };