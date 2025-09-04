// profile/detail/Counter.js
"use client";

import { useState } from "react";

export default function Counter() {
  const [state, setState] = useState(0);
  return (
    <div>
      <h1>{state}</h1>
      <button onClick={() => setState(state + 1)}>klik</button>
    </div>
  );
}
