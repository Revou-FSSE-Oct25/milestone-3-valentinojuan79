import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface CartStore {
  cart: any[];
  user: User | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      user: null, 
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id);
        if (existingItem) {
          return { cart: state.cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item ) };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((item) => item.id !== productId) })),
      clearCart: () => set({ cart: [] }),
      setUser: (user) => set({ user }),
      totalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    { name: 'revofun-storage',
        skipHydration: true,
     }
  )
);