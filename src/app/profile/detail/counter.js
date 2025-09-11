"use client";

import { useState } from "react";

export default function Counter() {
    const [nilai, setNilai] = useState(0);
    return (
        <>
            <h1>Nilai {nilai}</h1>
            <button onClick={() => setNilai(nilai + 1)}>klik</button>
        </>
    );
}