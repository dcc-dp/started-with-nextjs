"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Ada yang salah nich!</h2>
      <button onClick={() => reset()}>Coba Lagi!</button>
    </div>
  );
}
