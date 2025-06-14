import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/use-cart";
import Link from "next/link";
import { cn, generateTenantURL } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export const CheckoutButton = ({
  className,
  hideIfEmpty,
  tenantSlug,
}: CheckoutButtonProps) => {
  const { totalProductItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalProductItems === 0) return null;
  return (
    <Button
      variant="outline"
      asChild
      className={cn("bg-terracotta", className)}
    >
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingBag /> {totalProductItems > 0 ? totalProductItems : ""}
      </Link>
    </Button>
  );
};
