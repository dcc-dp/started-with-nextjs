'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DemoCard, DemoShell } from '@/app/_components/demo-shell'
import type { RegisterResult, UserInput } from '../action'
import { registerUser } from '../action'

export default function RegisterPage() {
  const [form, setForm] = useState<UserInput>({
    name: '',
    email: '',
    age: 0,
  })
  const [result, setResult] = useState<RegisterResult | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const registerResult = registerUser({
      ...form,
      age: Number(form.age),
    })

    setResult(registerResult)
  }

  return (
    <DemoShell
      eyebrow="Tanpa Zod"
      title="Form register dengan validasi manual."
      description="Versi ini memperlihatkan validasi if statement satu per satu, cocok untuk membandingkan kenapa schema validation terasa lebih rapi."
      mode="Tanpa library"
      notes={[
        'Array errors dibuat dan diisi manual di action.',
        'Setiap aturan butuh if statement sendiri.',
        'Semakin banyak field, semakin mudah aturan tercecer.',
      ]}
    >
      <DemoCard>
        <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold" htmlFor="manual-name">
                Name
              </label>
              <input
                id="manual-name"
                value={form.name}
                placeholder="Minimal 3 karakter"
                className="mt-2 h-12 w-full rounded-md border border-[#dedbd0] bg-[#fff7ed] px-4 text-sm outline-none focus:border-[#b45309]"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-semibold" htmlFor="manual-email">
                Email
              </label>
              <input
                id="manual-email"
                value={form.email}
                placeholder="nama@email.com"
                className="mt-2 h-12 w-full rounded-md border border-[#dedbd0] bg-[#fff7ed] px-4 text-sm outline-none focus:border-[#b45309]"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-semibold" htmlFor="manual-age">
                Age
              </label>
              <input
                id="manual-age"
                type="number"
                value={form.age}
                placeholder="Minimal 18"
                className="mt-2 h-12 w-full rounded-md border border-[#dedbd0] bg-[#fff7ed] px-4 text-sm outline-none focus:border-[#b45309]"
                onChange={(e) =>
                  setForm({ ...form, age: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="h-12 rounded-md bg-[#151513] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#b45309]"
              >
                Register
              </button>
              <Link
                href="/zod/create"
                className="flex h-12 items-center justify-center rounded-md border border-[#dedbd0] bg-white px-5 text-sm font-semibold hover:border-[#2563eb] hover:text-[#1d4ed8]"
              >
                Versi Zod
              </Link>
            </div>
          </form>

          <ResultPanel result={result} />
        </div>
      </DemoCard>
    </DemoShell>
  )
}

function ResultPanel({ result }: { result: RegisterResult | null }) {
  if (!result) {
    return (
      <aside className="rounded-lg border border-[#dedbd0] bg-[#fff7ed] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#68645b]">
          Result
        </p>
        <p className="mt-3 leading-7 text-[#57534a]">
          Submit form untuk melihat hasil dari validasi manual.
        </p>
      </aside>
    )
  }

  if (!result.success) {
    return (
      <aside className="rounded-lg border border-[#fecdd3] bg-[#fff1f2] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#be123c]">
          Manual errors
        </p>
        <ul className="mt-4 space-y-2 text-sm font-medium text-[#be123c]">
          {result.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </aside>
    )
  }

  return (
    <aside className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-5">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#15803d]">
        User valid
      </p>
      <dl className="mt-4 grid gap-3 text-sm">
        <div>
          <dt className="font-semibold">Name</dt>
          <dd className="text-[#57534a]">{result.data.name}</dd>
        </div>
        <div>
          <dt className="font-semibold">Email</dt>
          <dd className="text-[#57534a]">{result.data.email}</dd>
        </div>
        <div>
          <dt className="font-semibold">Age</dt>
          <dd className="text-[#57534a]">{result.data.age}</dd>
        </div>
      </dl>
    </aside>
  )
}
