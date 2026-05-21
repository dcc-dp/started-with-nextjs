import { create } from 'zustand'
import type { Store } from '@/type/store'

export const useStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))
