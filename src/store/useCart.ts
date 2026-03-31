import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isSubscription?: boolean;
  frequency?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        // Subscriptions should be treated as separate items if frequencies differ
        const itemKey = product.isSubscription ? `${product.id}-${product.frequency}` : product.id;
        const existingItem = currentItems.find((item) => {
            const currentKey = item.isSubscription ? `${item.id}-${item.frequency}` : item.id;
            return currentKey === itemKey;
        });

        if (existingItem) {
          set({
            items: currentItems.map((item) => {
              const currentKey = item.isSubscription ? `${item.id}-${item.frequency}` : item.id;
              return currentKey === itemKey ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item;
            }),
          });
        } else {
          set({
            items: [...currentItems, { ...product, quantity: product.quantity || 1 }],
          });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => {
            const currentId = item.isSubscription ? `${item.id}-${item.frequency}` : item.id;
            return currentId !== id;
        }) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set({
            items: get().items.map((item) => {
              const currentId = item.isSubscription ? `${item.id}-${item.frequency}` : item.id;
              return currentId === id ? { ...item, quantity } : item;
            }),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'sylara-cart',
    }
  )
);
