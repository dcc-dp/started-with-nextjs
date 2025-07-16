
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
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
        padding: "32px 24px",
        borderRadius: "18px",
        marginBottom: "32px",
        boxShadow:
          "0 6px 32px 0 rgba(0,0,0,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.08)",
        maxWidth: 520,
        margin: "0 auto 32px auto",
        border: "1.5px solid #e5e7eb",
      }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 18,
          color: "#22223b",
          letterSpacing: 0.2,
        }}
      >
        {user ? "Edit Pengguna" : "Tambah Pengguna Baru"}
      </h2>

      {message && (
        <div
          style={{
            backgroundColor: "#d1fae5",
            color: "#065f46",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "18px",
            fontWeight: 500,
            fontSize: 16,
            border: "1px solid #a7f3d0",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "18px",
            fontWeight: 500,
            fontSize: 16,
            border: "1px solid #fecaca",
          }}
        >
          {error}
        </div>
      )}

      <form id="userForm" action={handleSubmit} autoComplete="off">
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: 600,
              color: "#000",
              fontSize: 15,
              letterSpacing: 0.1,
            }}
          >
            Nama:
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user?.name || ""}
            disabled={isPending}
            required
            placeholder="Masukkan nama lengkap"
            style={{
              width: "100%",
              padding: "12px",
              border: "1.5px solid #cbd5e1",
              borderRadius: "7px",
              fontSize: 15,
              background: "#fff",
              color: "#000",
              transition: "border 0.2s",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: 600,
              color: "#000",
              fontSize: 15,
              letterSpacing: 0.1,
            }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email || ""}
            disabled={isPending}
            required
            placeholder="Masukkan email"
            style={{
              width: "100%",
              padding: "12px",
              border: "1.5px solid #cbd5e1",
              borderRadius: "7px",
              fontSize: 15,
              background: "#fff",
              color: "#000",
              transition: "border 0.2s",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: 600,
              color: "#000",
              fontSize: 15,
              letterSpacing: 0.1,
            }}
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
            placeholder="Masukkan umur"
            style={{
              width: "100%",
              padding: "12px",
              border: "1.5px solid #cbd5e1",
              borderRadius: "7px",
              fontSize: 15,
              background: "#fff",
              color: "#000",
              transition: "border 0.2s",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            disabled={isPending}
            style={{
              background: user
                ? "linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)"
                : "linear-gradient(90deg,#007bff 0%,#00c6ff 100%)",
              color: "#fff",
              padding: "12px 28px",
              border: "none",
              borderRadius: "7px",
              cursor: isPending ? "not-allowed" : "pointer",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
              opacity: isPending ? 0.7 : 1,
              transition: "background 0.2s, opacity 0.2s",
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
                background: "linear-gradient(90deg,#6c757d 0%,#adb5bd 100%)",
                color: "#fff",
                padding: "12px 28px",
                border: "none",
                borderRadius: "7px",
                cursor: isPending ? "not-allowed" : "pointer",
                fontWeight: 700,
                fontSize: 16,
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                opacity: isPending ? 0.7 : 1,
                transition: "background 0.2s, opacity 0.2s",
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
