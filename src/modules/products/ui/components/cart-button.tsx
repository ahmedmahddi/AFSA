import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";

interface Props {
  tenantSlug: string;
  productId: string;
}

export const CartButton = ({ tenantSlug, productId }: Props) => {
  const cart = useCart(tenantSlug);
  return (
    <Button
      onClick={() => cart.toggleProduct(productId)}
      variant="outline"
      className={cn(
        "flex-1 bg-sage",
        cart.isProductInCart(productId) && "bg-sage"
      )}
    >
      {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};
