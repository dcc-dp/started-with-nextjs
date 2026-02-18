"use client";

import { useEffect, useState } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./actions";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      await updateUser(editingId, name, email);
      setEditingId(null);
    } else {
      await createUser(name, email);
    }

    setName("");
    setEmail("");
    await fetchUsers();
    setLoading(false);
  }

  function handleEdit(user: User) {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id);
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin hapus user ini?")) return;
    await deleteUser(id);
    fetchUsers();
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>👤 User Management</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              background: editingId ? "#f59e0b" : "#2563eb",
            }}
            disabled={loading}
          >
            {editingId ? "Update User" : "Tambah User"}
          </button>
        </form>

        {/* TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={3} style={styles.empty}>
                  Belum ada data
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.smallBtn, background: "#22c55e" }}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.smallBtn, background: "#ef4444" }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 700,
    background: "#ffffff",
    padding: 24,
    borderRadius: 14,
    boxShadow: "0 20px 40px rgba(0,0,0,.12)",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
    color: "#0f172a",
  },
  form: {
    display: "grid",
    gap: 12,
    marginBottom: 24,
  },
  input: {
    padding: "12px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
  },
  button: {
    padding: "12px",
    borderRadius: 8,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "10px",
    background: "#e2e8f0",
    color: "#0f172a",
    fontWeight: 600,
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    color: "#1e293b",
  },
  empty: {
    textAlign: "center",
    padding: 20,
    color: "#64748b",
    fontStyle: "italic",
  },
  smallBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginRight: 6,
    fontSize: 12,
  },
};