"use client";

import { useState, useEffect } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "./actions";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load users
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      await updateUser(editingId, name, email);
      setEditingId(null);
    } else {
      await createUser(name, email);
    }
    setName("");
    setEmail("");
    fetchUsers();
  }

  function handleEdit(user: User) {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id);
  }

  async function handleDelete(id: number) {
    await deleteUser(id);
    fetchUsers();
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1>User Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Update" : "Create"}</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: 10 }}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)} style={{ marginLeft: 10 }}>
              Edit
            </button>
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: 5 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}