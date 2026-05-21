import { create } from 'zustand'

export type Product = {
  id: number
  name: string
  category: string
  price: number
}

type CartItem = Product & {
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (product: Product) => void
  decreaseItem: (id: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const currentItem = state.items.find((item) => item.id === product.id)

      if (currentItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      }
    }),
  decreaseItem: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}))
