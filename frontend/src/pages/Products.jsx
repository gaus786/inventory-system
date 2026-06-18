import { useEffect, useState } from "react";
import API from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", sku: "", price: "", quantity: "" });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const load = () => API.get("/products").then((r) => setProducts(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");
    const payload = { ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) };
    try {
      if (editId) {
        await API.put(`/products/${editId}`, payload);
        setMsg("Product updated!");
      } else {
        await API.post("/products", payload);
        setMsg("Product added!");
      }
      setForm({ name: "", sku: "", price: "", quantity: "" });
      setEditId(null);
      load();
    } catch (err) {
      setError(err.response?.data?.detail || "Error occurred");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await API.delete(`/products/${id}`);
    load();
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({ name: p.name, sku: p.sku, price: p.price, quantity: p.quantity });
  };

  return (
    <div>
      <h1>📦 Products</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>{editId ? "Edit Product" : "Add New Product"}</h3>
        {msg && <p style={{ color: "green" }}>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {["name", "sku", "price", "quantity"].map((field) => (
          <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]} required
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            style={inputStyle} />
        ))}
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={btnStyle("#3b82f6")}>
            {editId ? "Update" : "Add Product"}
          </button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: "", sku: "", price: "", quantity: "" }); }} style={btnStyle("#6b7280")}>Cancel</button>}
        </div>
      </form>

      {/* Table */}
      <table style={{ background: "white", borderRadius: "8px", borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#eff6ff" }}>
            {["ID", "Name", "SKU", "Price", "Qty", "Actions"].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={td}>{p.id}</td>
              <td style={td}>{p.name}</td>
              <td style={td}>{p.sku}</td>
              <td style={td}>₹{p.price}</td>
              <td style={{ ...td, color: p.quantity < 10 ? "#ef4444" : "inherit" }}>{p.quantity}</td>
              <td style={td}>
                <button onClick={() => handleEdit(p)} style={btnStyle("#f59e0b", "sm")}>Edit</button>{" "}
                <button onClick={() => handleDelete(p.id)} style={btnStyle("#ef4444", "sm")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const formStyle = { background: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" };
const inputStyle = { padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px" };
const btnStyle = (bg, size) => ({ background: bg, color: "white", border: "none", padding: size === "sm" ? "5px 10px" : "10px 20px", borderRadius: "6px", cursor: "pointer", fontSize: size === "sm" ? "12px" : "14px" });
const th = { padding: "10px 15px", textAlign: "left", borderBottom: "1px solid #e5e7eb" };
const td = { padding: "10px 15px", borderBottom: "1px solid #e5e7eb" };