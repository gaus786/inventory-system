import { useEffect, useState } from "react";
import API from "../api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const load = () => API.get("/customers").then((r) => setCustomers(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");
    try {
      await API.post("/customers", form);
      setMsg("Customer added!");
      setForm({ full_name: "", email: "", phone: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.detail || "Error occurred");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;
    await API.delete(`/customers/${id}`);
    load();
  };

  return (
    <div>
      <h1>👤 Customers</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>Add New Customer</h3>
        {msg && <p style={{ color: "green" }}>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {[
          { field: "full_name", label: "Full Name" },
          { field: "email", label: "Email" },
          { field: "phone", label: "Phone" },
        ].map(({ field, label }) => (
          <input key={field} placeholder={label} value={form[field]} required
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            style={inputStyle} />
        ))}
        <button type="submit" style={btnStyle("#10b981")}>Add Customer</button>
      </form>

      <table style={{ background: "white", borderRadius: "8px", borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#ecfdf5" }}>
            {["ID", "Name", "Email", "Phone", "Action"].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td style={td}>{c.id}</td>
              <td style={td}>{c.full_name}</td>
              <td style={td}>{c.email}</td>
              <td style={td}>{c.phone}</td>
              <td style={td}>
                <button onClick={() => handleDelete(c.id)} style={btnStyle("#ef4444", "sm")}>Delete</button>
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
const btnStyle = (bg, size) => ({ background: bg, color: "white", border: "none", padding: size === "sm" ? "5px 10px" : "10px 20px", borderRadius: "6px", cursor: "pointer" });
const th = { padding: "10px 15px", textAlign: "left", borderBottom: "1px solid #e5e7eb" };
const td = { padding: "10px 15px", borderBottom: "1px solid #e5e7eb" };