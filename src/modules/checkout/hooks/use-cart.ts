import { useCartStore } from "../store/use-cart-store";

export const useCart = (storeSlug: string) => {
  const {
    getCartByStore,
    addProduct,
    removeProduct,
    clearCart,
    clearAllCarts,
    getAllProducts,
    updateQuantity,
  } = useCartStore();

  const items = getCartByStore(storeSlug);
  const allItems = getAllProducts();

  const toggleProduct = (
    productId: string,
    variantId?: string,
    variantName?: string,
    variantSku?: string
  ) => {
    const existingItem = items.find(
      item => item.productId === productId && item.variantId === variantId
    );
    if (existingItem) {
      removeProduct(storeSlug, productId, variantId);
    } else {
      addProduct(storeSlug, productId, variantId, variantName, variantSku, 1);
    }
  };

  const isProductInCart = (productId: string, variantId?: string) => {
    return items.some(
      item => item.productId === productId && item.variantId === variantId
    );
  };

  const clearStoreCart = () => {
    clearCart(storeSlug);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalProductItems = allItems.reduce(
    (sum, { item }) => sum + item.quantity,
    0
  );

  return {
    items, 
    addProduct: (
      productId: string,
      variantId?: string,
      variantName?: string,
      variantSku?: string,
      quantity: number = 1
    ) =>
      addProduct(
        storeSlug,
        productId,
        variantId,
        variantName,
        variantSku,
        quantity
      ),
    removeProduct: (productId: string, variantId?: string) =>
      removeProduct(storeSlug, productId, variantId),
    updateQuantity: (
      productId: string,
      variantId: string | undefined,
      quantity: number
    ) => updateQuantity(storeSlug, productId, variantId, quantity),
    clearCart: clearStoreCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems,
    totalProductItems, 
  };
};
