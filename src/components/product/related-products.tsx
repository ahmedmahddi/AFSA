import Link from "next/link";
import Image from "next/image";
import { Tenant } from "@/payload-types";
import { formatCurrency } from "@/lib/utils";

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: { url: string } | null;
  store: Tenant;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  // Filter out products without valid store data
  const validProducts = products.filter(
    product => product.store && product.store.slug
  );

  if (validProducts.length === 0) {
    return null; // Or return an empty state message
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">You Might Also Like</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {validProducts.map(product => (
          <Link
            key={product.id}
            href={`/tenants/${product.store.slug}/products/${product.id}`}
            className="group"
          >
            <div className="overflow-hidden rounded-lg">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product.image?.url ?? "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="line-clamp-2 font-medium group-hover:text-terracotta">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  by {product.store.name}
                </p>
                <p className="mt-2 font-medium text-terracotta">
                  {formatCurrency(product.price, product.currency)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
