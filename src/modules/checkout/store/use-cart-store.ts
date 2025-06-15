import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  variantId?: string;
  variantName?: string;
  variantSku?: string;
  quantity: number;
}

interface StoreCart {
  items: CartItem[];
}

interface CartState {
  storeCarts: Record<string, StoreCart>;
  addProduct: (
    storeSlug: string,
    productId: string,
    variantId?: string,
    variantName?: string,
    variantSku?: string,
    quantity?: number
  ) => void;
  removeProduct: (
    storeSlug: string,
    productId: string,
    variantId?: string
  ) => void;
  clearCart: (storeSlug: string) => void;
  clearAllCarts: () => void;
  getCartByStore: (storeSlug: string) => CartItem[];
  getAllProducts: () => { storeSlug: string; item: CartItem }[];
  updateQuantity: (
    storeSlug: string,
    productId: string,
    variantId?: string,
    quantity?: number
  ) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      storeCarts: {},
      addProduct: (
        storeSlug,
        productId,
        variantId,
        variantName,
        variantSku,
        quantity = 1
      ) =>
        set(state => {
          const existingCart = state.storeCarts[storeSlug] ?? { items: [] };
          const existingItemIndex = existingCart.items.findIndex(
            item => item.productId === productId && item.variantId === variantId
          );

          let updatedItems: CartItem[];
          if (existingItemIndex >= 0) {
            // Update quantity if item exists
            updatedItems = [...existingCart.items];
            updatedItems[existingItemIndex] = {
              productId: updatedItems[existingItemIndex]!.productId,
              quantity: updatedItems[existingItemIndex]!.quantity + quantity,
              variantId: updatedItems[existingItemIndex]!.variantId,
              variantName: updatedItems[existingItemIndex]!.variantName,
              variantSku: updatedItems[existingItemIndex]!.variantSku,
            };
          } else {
            // Add new item
            updatedItems = [
              ...existingCart.items,
              {
                productId,
                variantId,
                variantName,
                variantSku,
                quantity,
              },
            ];
          }

          return {
            storeCarts: {
              ...state.storeCarts,
              [storeSlug]: { items: updatedItems },
            },
          };
        }),
      removeProduct: (storeSlug, productId, variantId) =>
        set(state => ({
          storeCarts: {
            ...state.storeCarts,
            [storeSlug]: {
              items:
                state.storeCarts[storeSlug]?.items.filter(
                  item =>
                    !(
                      item.productId === productId &&
                      item.variantId === variantId
                    )
                ) ?? [],
            },
          },
        })),
      clearCart: storeSlug =>
        set(state => ({
          storeCarts: {
            ...state.storeCarts,
            [storeSlug]: { items: [] },
          },
        })),
      clearAllCarts: () => set({ storeCarts: {} }),
      getCartByStore: storeSlug => get().storeCarts[storeSlug]?.items ?? [],
      getAllProducts: () =>
        Object.entries(get().storeCarts).flatMap(([storeSlug, cart]) =>
          cart.items.map(item => ({ storeSlug, item }))
        ),
      updateQuantity: (storeSlug, productId, variantId, quantity) =>
        set(state => {
          const existingCart = state.storeCarts[storeSlug] ?? { items: [] };
          const itemIndex = existingCart.items.findIndex(
            item => item.productId === productId && item.variantId === variantId
          );

          if (itemIndex >= 0 && quantity !== undefined && quantity > 0) {
            const updatedItems = [...existingCart.items];
            updatedItems[itemIndex] = {
              productId: updatedItems[itemIndex]!.productId,
              variantId: updatedItems[itemIndex]!.variantId,
              variantName: updatedItems[itemIndex]!.variantName,
              variantSku: updatedItems[itemIndex]!.variantSku,
              quantity,
            };
            return {
              storeCarts: {
                ...state.storeCarts,
                [storeSlug]: { items: updatedItems },
              },
            };
          } else if (
            itemIndex >= 0 &&
            quantity !== undefined &&
            quantity <= 0
          ) {
            return {
              storeCarts: {
                ...state.storeCarts,
                [storeSlug]: {
                  items: existingCart.items.filter(
                    (_, index) => index !== itemIndex
                  ),
                },
              },
            };
          }
          return state;
        }),
    }),
    {
      name: "afsa-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
