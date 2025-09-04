// app/dashboard/template.js
import TemplateState from "@/app/components/templateState"

export default function DashboardTemplate({ children }) {
  return (
    <section style={{ background: "#f3f4f6", padding: 12, borderRadius: 12, marginTop: 12 }}>
      <p>🔄 Dashboard Template (selalu re-render saat navigasi dalam /dashboard)</p>

      {/* Komponen client yang akan RESET setiap pindah halaman */}
      <TemplateState />

      <div style={{ marginTop: 12 }}>{children}</div>
    </section>
  );
}
