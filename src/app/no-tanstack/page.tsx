'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DemoCard, DemoShell } from '@/app/_components/demo-shell'
import { User } from '@/type/user'

async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!res.ok) {
    throw new Error('Gagal mengambil data user')
  }

  return res.json() as Promise<User[]>
}

function Todos() {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    fetchUsers()
      .then((result) => {
        if (isMounted) {
          setData(result)
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <DemoShell
      eyebrow="Tanpa TanStack Query"
      title="Data fetching manual dengan useEffect dan useState."
      description="Versi ini sengaja menampilkan pekerjaan yang biasanya diambil alih TanStack Query: loading, error, data, dan fetch awal di useEffect."
      mode="Tanpa library"
      notes={[
        'Perlu state terpisah untuk data, loading, dan error.',
        'Fetch awal dijalankan manual lewat useEffect.',
        'Caching, dedupe request, dan stale state belum tersedia otomatis.',
      ]}
    >
      <DemoCard>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#68645b]">
              Manual fetch
            </p>
            <h2 className="mt-2 text-2xl font-semibold">JSONPlaceholder users</h2>
          </div>
          <Link
            href="/tanstack"
            className="flex h-11 items-center justify-center rounded-md border border-[#dedbd0] bg-white px-4 text-sm font-semibold hover:border-[#2563eb] hover:text-[#1d4ed8]"
          >
            Versi TanStack
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-md border border-[#dedbd0] bg-[#fff7ed]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-md border border-[#fecdd3] bg-[#fff1f2] p-4 text-sm font-medium text-[#be123c]">
            {error}.
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.map((user) => (
              <li
                key={user.id}
                className="rounded-md border border-[#dedbd0] bg-[#fffaf0] p-4"
              >
                <p className="font-semibold">{user.name}</p>
                <p className="mt-1 font-mono text-sm text-[#57534a]">
                  @{user.username}
                </p>
                <p className="mt-3 text-sm text-[#68645b]">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </DemoCard>
    </DemoShell>
  )
}

export default Todos
