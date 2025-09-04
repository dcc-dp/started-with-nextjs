"use client";

import { useRef, useState } from "react";

export default function TemplateState() {
  const mountedAt = useRef(new Date().toLocaleTimeString());
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: "1px solid #f59e0b", borderRadius: 10, padding: 12, marginTop: 8 }}>
      <strong>TemplateState (re-render tiap navigasi)</strong>
      <div>Count: {count}</div>
      <button onClick={() => setCount((c) => c + 1)} style={{ marginTop: 8, color: "red" }}>
        + Increment (akan reset saat pindah halaman dashboard)
      </button>
    </div>
  );
}
