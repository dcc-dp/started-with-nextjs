"use client";

import { useState, useTransition } from "react";
import { deleteUser } from "../lib/actions";
import UserForm from "./UserForm";

export default function UserList({ users }) {
  const [editingUser, setEditingUser] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      startTransition(async () => {
        try {
          await deleteUser(id);
        } catch (error) {
          alert(error.message);
        }
      });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  if (editingUser) {
    return <UserForm user={editingUser} onCancel={handleCancelEdit} />;
  }

  return (
    <div>
      <h2>Daftar Pengguna</h2>
      {users.length === 0 ? (
        <p>Tidak ada pengguna yang tersedia.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                  textAlign: "left",
                  color: "#000",
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                  textAlign: "left",
                  color: "#000",
                }}
              >
                Nama
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                  textAlign: "left",
                  color: "#000",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                  textAlign: "left",
                  color: "#000",
                }}
              >
                Umur
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                  textAlign: "left",
                  color: "#000",
                }}
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    color: "#000",
                  }}
                >
                  {user.id}
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    color: "#000",
                  }}
                >
                  {user.name}
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    color: "#000",
                  }}
                >
                  {user.email}
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    color: "#000",
                  }}
                >
                  {user.age}
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <button
                    onClick={() => handleEdit(user)}
                    disabled={isPending}
                    style={{
                      backgroundColor: "#ffc107",
                      color: "black",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: isPending ? "not-allowed" : "pointer",
                      marginRight: "5px",
                      opacity: isPending ? 0.6 : 1,
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={isPending}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: isPending ? "not-allowed" : "pointer",
                      opacity: isPending ? 0.6 : 1,
                    }}
                  >
                    {isPending ? "Deleting..." : "Hapus"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
