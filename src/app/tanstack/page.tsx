'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { DemoCard, DemoShell } from '@/app/_components/demo-shell'
import { User } from '@/type/user'

function Todos() {
  const { data = [], isPending, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/users').then((r) => {
        if (!r.ok) {
          throw new Error('Gagal mengambil data user')
        }

        return r.json()
      }),
  })

  return (
    <DemoShell
      eyebrow="TanStack Query"
      title="Data fetching dengan cache dan status bawaan."
      description="Halaman ini memakai useQuery untuk mengambil daftar user, lalu membiarkan TanStack Query mengurus loading, error, dan cache."
      mode="Dengan library"
      notes={[
        'Query key membuat hasil fetch bisa di-cache otomatis.',
        'Status isPending dan error tersedia tanpa state manual.',
        'Komponen tidak perlu useEffect untuk menjalankan fetch awal.',
      ]}
    >
      <DemoCard>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#68645b]">
              Users query
            </p>
            <h2 className="mt-2 text-2xl font-semibold">JSONPlaceholder users</h2>
          </div>
          <Link
            href="/no-tanstack"
            className="flex h-11 items-center justify-center rounded-md border border-[#dedbd0] bg-white px-4 text-sm font-semibold hover:border-[#2563eb] hover:text-[#1d4ed8]"
          >
            Versi manual
          </Link>
        </div>

        {isPending ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-md border border-[#dedbd0] bg-[#f7f7f2]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-md border border-[#fecdd3] bg-[#fff1f2] p-4 text-sm font-medium text-[#be123c]">
            Oops, data gagal dimuat.
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.map((user) => (
              <li
                key={user.id}
                className="rounded-md border border-[#dedbd0] bg-[#f7f7f2] p-4"
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
