import { create } from "zustand"
import type { MenuItem } from "../types/menu"

interface CartItem extends MenuItem {
  quantity: number
}

interface CartStore {
  cart: CartItem[]

  addToCart: (item: MenuItem) => void

  increaseQuantity: (id: number) => void

  decreaseQuantity: (id: number) => void

  removeFromCart: (id: number) => void

  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id)

      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }

      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      }
    }),

  increaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}))