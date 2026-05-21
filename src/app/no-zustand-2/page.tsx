'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DemoCard, DemoShell } from '@/app/_components/demo-shell'

type Product = {
  id: number
  name: string
  category: string
  price: number
}

type CartItem = Product & {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'React Handbook',
    category: 'Book',
    price: 120000,
  },
  {
    id: 2,
    name: 'TypeScript Sticker Pack',
    category: 'Merch',
    price: 35000,
  },
  {
    id: 3,
    name: 'Frontend Workshop Ticket',
    category: 'Event',
    price: 250000,
  },
]

const currency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export default function NoZustandCartPage() {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product) => {
    setItems((currentItems) => {
      const currentItem = currentItems.find((item) => item.id === product.id)

      if (currentItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const decreaseItem = (id: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <DemoShell
      eyebrow="Tanpa Zustand 2"
      title="Shopping cart dengan useState lokal."
      description="Contoh ini memakai UI yang sama seperti cart Zustand, tetapi seluruh state dan action cart ditaruh langsung di page component."
      mode="Tanpa library"
      notes={[
        'State items berada langsung di src/app/no-zustand-2/page.tsx.',
        'Semua action cart dibuat lokal dengan setItems.',
        'Pindah route lalu kembali ke halaman ini: cart akan reset karena komponen dibuat ulang.',
      ]}
    >
      <DemoCard>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#68645b]">
                  Product catalog
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Tambahkan item ke cart
                </h2>
              </div>
              <Link
                href="/zustand-2"
                className="hidden h-11 items-center justify-center rounded-md border border-[#dedbd0] bg-white px-4 text-sm font-semibold hover:border-[#2563eb] hover:text-[#1d4ed8] sm:flex"
              >
                Versi Zustand
              </Link>
            </div>

            <div className="grid gap-3">
              {products.map((product) => {
                const cartItem = items.find((item) => item.id === product.id)

                return (
                  <article
                    key={product.id}
                    className="rounded-md border border-[#dedbd0] bg-[#fff7ed] p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#b45309]">
                          {product.category}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="mt-1 font-mono text-sm text-[#57534a]">
                          {currency.format(product.price)}
                        </p>
                      </div>

                      <button
                        onClick={() => addItem(product)}
                        className="h-11 rounded-md bg-[#151513] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[#b45309]"
                      >
                        {cartItem
                          ? `Tambah lagi (${cartItem.quantity})`
                          : 'Tambah ke cart'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <aside className="rounded-lg border border-[#dedbd0] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#68645b]">
                  Cart summary
                </p>
                <p className="mt-2 text-3xl font-semibold">{totalItems} item</p>
              </div>
              <button
                onClick={clearCart}
                disabled={items.length === 0}
                className="h-10 rounded-md border border-[#dedbd0] bg-[#fff7ed] px-3 text-sm font-semibold text-[#57534a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {items.length === 0 ? (
                <div className="rounded-md border border-dashed border-[#dedbd0] bg-[#fff7ed] p-5 text-sm leading-6 text-[#57534a]">
                  Cart masih kosong. Tambahkan produk dari katalog untuk
                  melihat state lokal berubah.
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-md border border-[#dedbd0] bg-[#fff7ed] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="mt-1 font-mono text-sm text-[#57534a]">
                          {currency.format(item.price * item.quantity)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-semibold text-[#be123c] hover:text-[#9f1239]"
                      >
                        Hapus
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => decreaseItem(item.id)}
                        className="size-9 rounded-md border border-[#dedbd0] bg-white font-semibold hover:border-[#b45309] hover:text-[#92400e]"
                        aria-label={`Kurangi ${item.name}`}
                      >
                        -
                      </button>
                      <span className="flex h-9 min-w-10 items-center justify-center rounded-md bg-white px-3 font-mono text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addItem(item)}
                        className="size-9 rounded-md border border-[#dedbd0] bg-white font-semibold hover:border-[#b45309] hover:text-[#92400e]"
                        aria-label={`Tambah ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 border-t border-[#dedbd0] pt-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="font-mono text-lg font-semibold text-[#b45309]">
                  {currency.format(subtotal)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </DemoCard>
    </DemoShell>
  )
}
