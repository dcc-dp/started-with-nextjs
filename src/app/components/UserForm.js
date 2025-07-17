"use client";

import { useState, useTransition } from "react";

export default function UserForm({ user = null, onCancel = null }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setMessage("");
    setError("");

    startTransition(async () => {
      try {
        if (user) {
          await updateUser(user.id, formData);
        } else {
          await createUser(formData);
        }
        setMessage(
          user
            ? "Pengguna berhasil diperbarui!"
            : "Pengguna berhasil ditambahkan!"
        );

        if (!user) {
          // Reset form untuk create
          document.getElementById("userForm").reset();
        }

        if (onCancel) {
          setTimeout(() => onCancel(), 1000);
        }
      } catch (err) {
        setError(err.message);
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ color: "#000" }}>
        {user ? "Edit Pengguna" : "Tambah Pengguna Baru"}
      </h2>

      {message && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          {error}
        </div>
      )}

      <form id="userForm" action={handleSubmit}>
        <div style={{ marginBottom: "15px", color: "#000" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#000" }}
          >
            Nama:
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user?.name || ""}
            disabled={isPending}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#000",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px", color: "#000" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#000" }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email || ""}
            disabled={isPending}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#000",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px", color: "#000" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#000" }}
          >
            Umur:
          </label>
          <input
            type="number"
            name="age"
            defaultValue={user?.age || ""}
            disabled={isPending}
            required
            min="1"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#000",
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isPending}
            style={{
              backgroundColor: user ? "#28a745" : "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: isPending ? "not-allowed" : "pointer",
              marginRight: "10px",
              opacity: isPending ? 0.6 : 1,
            }}
          >
            {isPending ? "Processing..." : user ? "Update" : "Tambah"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isPending}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: isPending ? "not-allowed" : "pointer",
                opacity: isPending ? 0.6 : 1,
              }}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
