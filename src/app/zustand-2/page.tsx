'use client'

import Link from 'next/link'
import { DemoCard, DemoShell } from '@/app/_components/demo-shell'
import { Product, useCartStore } from '@/state/cart-store'

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

export default function ZustandCartPage() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const decreaseItem = useCartStore((state) => state.decreaseItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <DemoShell
      eyebrow="Zustand 2"
      title="Shopping cart dengan store global."
      description="Contoh ini menunjukkan state cart yang dipakai oleh katalog produk, ringkasan belanja, dan kontrol quantity tanpa mengirim props berantai."
      mode="Dengan library"
      notes={[
        'Store cart hidup di src/state/cart-store.ts.',
        'Katalog dan ringkasan membaca state yang sama lewat useCartStore.',
        'Pindah route lalu kembali ke halaman ini: cart tetap tersimpan selama browser tidak reload.',
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
              <div className="hidden gap-3 sm:flex">
                <Link
                  href="/zustand"
                  className="flex h-11 items-center justify-center rounded-md border border-[#dedbd0] bg-white px-4 text-sm font-semibold hover:border-[#2563eb] hover:text-[#1d4ed8]"
                >
                  Counter demo
                </Link>
                <Link
                  href="/no-zustand-2"
                  className="flex h-11 items-center justify-center rounded-md border border-[#dedbd0] bg-white px-4 text-sm font-semibold hover:border-[#2563eb] hover:text-[#1d4ed8]"
                >
                  Versi manual
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {products.map((product) => {
                const cartItem = items.find((item) => item.id === product.id)

                return (
                  <article
                    key={product.id}
                    className="rounded-md border border-[#dedbd0] bg-[#f7f7f2] p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2563eb]">
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
                        className="h-11 rounded-md bg-[#151513] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[#2563eb]"
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
                className="h-10 rounded-md border border-[#dedbd0] bg-[#f7f7f2] px-3 text-sm font-semibold text-[#57534a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {items.length === 0 ? (
                <div className="rounded-md border border-dashed border-[#dedbd0] bg-[#f7f7f2] p-5 text-sm leading-6 text-[#57534a]">
                  Cart masih kosong. Tambahkan produk dari katalog untuk
                  melihat state global berubah.
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-md border border-[#dedbd0] bg-[#f7f7f2] p-4"
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
                        className="size-9 rounded-md border border-[#dedbd0] bg-white font-semibold hover:border-[#2563eb] hover:text-[#1d4ed8]"
                        aria-label={`Kurangi ${item.name}`}
                      >
                        -
                      </button>
                      <span className="flex h-9 min-w-10 items-center justify-center rounded-md bg-white px-3 font-mono text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addItem(item)}
                        className="size-9 rounded-md border border-[#dedbd0] bg-white font-semibold hover:border-[#2563eb] hover:text-[#1d4ed8]"
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
                <span className="font-mono text-lg font-semibold text-[#2563eb]">
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
