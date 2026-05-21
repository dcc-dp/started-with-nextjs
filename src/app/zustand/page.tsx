'use client'

import Link from 'next/link'
import { DemoCard, DemoShell } from '@/app/_components/demo-shell'
import { useStore } from '@/state/store'

export default function Counter() {
  const { count, inc } = useStore()

  return (
    <DemoShell
      eyebrow="Zustand"
      title="Counter dengan global store yang tetap ringan."
      description="Halaman ini memakai store Zustand untuk menyimpan count dan action inc di luar komponen."
      mode="Dengan library"
      notes={[
        'State dan action hidup di src/state/store.ts.',
        'Komponen cukup mengambil count dan inc lewat hook useStore.',
        'Cocok untuk state yang dipakai lintas komponen atau lintas route.',
      ]}
    >
      <DemoCard>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-lg border border-[#dedbd0] bg-[#f7f7f2] p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#68645b]">
              Current count
            </p>
            <span className="mt-4 block font-mono text-8xl font-semibold leading-none text-[#2563eb]">
              {count}
            </span>
          </div>

          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold">Satu action, satu store.</h2>
              <p className="mt-2 leading-7 text-[#57534a]">
                Klik tombol untuk memanggil action yang didefinisikan di store.
                Bagian menarik untuk demo: page ini tidak punya useState lokal.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={inc}
                className="h-12 rounded-md bg-[#151513] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#2563eb]"
              >
                One up
              </button>
              <Link
                href="/no-zustand"
                className="flex h-12 items-center justify-center rounded-md border border-[#dedbd0] bg-white px-5 text-sm font-semibold text-[#151513] hover:border-[#2563eb] hover:text-[#1d4ed8]"
              >
                Bandingkan tanpa Zustand
              </Link>
              <Link
                href="/zustand-2"
                className="flex h-12 items-center justify-center rounded-md border border-[#dedbd0] bg-[#f7f7f2] px-5 text-sm font-semibold text-[#151513] hover:border-[#2563eb] hover:text-[#1d4ed8]"
              >
                Contoh cart store
              </Link>
            </div>
          </div>
        </div>
      </DemoCard>
    </DemoShell>
  )
}
