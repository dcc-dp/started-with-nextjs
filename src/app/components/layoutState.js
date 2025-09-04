"use client";

import { useRef, useState } from "react";

export default function LayoutState() {
  const mountedAt = useRef(new Date().toLocaleTimeString());
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: "1px solid #60a5fa", borderRadius: 10, padding: 12, marginTop: 8 }}>
      <strong>LayoutState (persisten)</strong>
      <div>Count: {count}</div>
      <button onClick={() => setCount((c) => c + 1)} style={{ marginTop: 8 }}>
        + Increment (tetap saat pindah halaman dashboard)
      </button>
    </div>
  );
}
