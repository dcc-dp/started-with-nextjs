'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DemoCard, DemoShell } from '@/app/_components/demo-shell'

function Counter() {
  const [count, setCount] = useState(1)

  const inc = () => {
    setCount((prev) => prev + 1)
  }

  return (
    <DemoShell
      eyebrow="Tanpa Zustand"
      title="Counter dengan useState lokal di komponen."
      description="Versi manual ini bagus untuk state yang sederhana, tetapi mulai terasa terbatas ketika state harus dibagi ke banyak tempat."
      mode="Tanpa library"
      notes={[
        'State count berada langsung di page component.',
        'Action inc juga dibuat lokal memakai setState.',
        'Bagus untuk contoh awal sebelum memperkenalkan global store.',
      ]}
    >
      <DemoCard>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-lg border border-[#dedbd0] bg-[#fff7ed] p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#68645b]">
              Local count
            </p>
            <span className="mt-4 block font-mono text-8xl font-semibold leading-none text-[#b45309]">
              {count}
            </span>
          </div>

          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold">State tinggal di page.</h2>
              <p className="mt-2 leading-7 text-[#57534a]">
                Klik tombol untuk menjalankan setState lokal. Ini pendek dan
                jelas, lalu bisa dibandingkan langsung dengan versi store.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={inc}
                className="h-12 rounded-md bg-[#151513] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#b45309]"
              >
                One up
              </button>
              <Link
                href="/zustand"
                className="flex h-12 items-center justify-center rounded-md border border-[#dedbd0] bg-white px-5 text-sm font-semibold text-[#151513] hover:border-[#2563eb] hover:text-[#1d4ed8]"
              >
                Bandingkan dengan Zustand
              </Link>
              <Link
                href="/no-zustand-2"
                className="flex h-12 items-center justify-center rounded-md border border-[#dedbd0] bg-[#fff7ed] px-5 text-sm font-semibold text-[#151513] hover:border-[#b45309] hover:text-[#92400e]"
              >
                Contoh cart manual
              </Link>
            </div>
          </div>
        </div>
      </DemoCard>
    </DemoShell>
  )
}

export default Counter
