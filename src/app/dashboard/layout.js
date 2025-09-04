// app/dashboard/layout.js
import Link from "next/link";
import LayoutState from "@/app/components/layoutState";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ border: "2px solid #1d4ed8", borderRadius: 16, padding: 16 }}>
      <h2>📊 Dashboard Layout (persisten)</h2>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link href="/dashboard">Main</Link>
        <Link href="/dashboard/settings">Settings</Link>
      </nav>

      {/* Komponen client yang PERSIST */}
      <LayoutState />

      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}
