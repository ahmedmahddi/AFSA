"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Heart, Share2, ShoppingBag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImageGallery } from "@/components/product/image-gallery";
import {
  VariantSelector,
  Variant,
} from "@/components/product/variant-selector";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { SellerInfo } from "@/components/product/seller-info";
import { Reviews } from "@/components/product/reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { Tag } from "@/payload-types";

interface ProductViewProps {
  productId: string;
  storeSlug: string;
}

export const ProductView = ({ productId, storeSlug }: ProductViewProps) => {
  const trpc = useTRPC();
  const { data: product } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );
  const { data: relatedProducts } = useSuspenseQuery(
    trpc.products.getRelated.queryOptions({
      productId,
      categorySlug: product.category?.slug ?? null,
      storeSlug,
      tags: product.tags?.map(tag => tag.name) ?? [],
    })
  );

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants?.[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addProduct, isProductInCart } = useCart(storeSlug);

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  const handleQuantityChange = (qty: number) => {
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    addProduct(
      product.id,
      selectedVariant?.id ?? undefined,
      selectedVariant?.name,
      selectedVariant?.sku ?? product.sku ?? undefined,
      quantity
    );
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const currentPrice = selectedVariant?.price ?? product.price;
  const currentStock = selectedVariant?.stock ?? product.stock;
  const isOutOfStock = currentStock === 0;

  const formattedPrice = formatCurrency(
    currentPrice,
    product.currency ?? "TND"
  );
  const formattedCompareAtPrice = product.compareAtPrice
    ? formatCurrency(product.compareAtPrice, product.currency ?? "TND")
    : null;
  const discountPercentage = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - currentPrice) / product.compareAtPrice) * 100
      )
    : null;

  return (
    <div className="space-y-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1">
          <ImageGallery images={product.images} alt={product.name} />
        </div>

        <div className="space-y-6 md:col-span-1">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-ochre text-ochre" />
                <span className="ml-1">
                  {product.reviews?.length
                    ? (
                        product.reviews.reduce((acc, r) => acc + r.rating, 0) /
                        product.reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </span>
              </div>
              <span className="mx-2 text-muted-foreground">•</span>
              <Link href="#reviews" className="text-sm hover:underline">
                {product.reviews?.length ?? 0} reviews
              </Link>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {currentStock} {currentStock === 1 ? "item" : "items"} left
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-2xl font-bold text-terracotta">
              {formattedPrice}
            </div>
            {formattedCompareAtPrice && (
              <>
                <div className="ml-2 text-lg text-muted-foreground line-through">
                  {formattedCompareAtPrice}
                </div>
                <Badge
                  variant="outline"
                  className="ml-2 bg-terracotta/10 text-terracotta"
                >
                  {discountPercentage}% OFF
                </Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground">
            {product.description ?? "No description provided."}
          </p>

          {product.variants?.length && (
            <VariantSelector
              variants={product.variants}
              onSelect={handleVariantSelect}
            />
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Quantity</h3>
              <QuantitySelector
                max={currentStock}
                onChange={handleQuantityChange}
              />
            </div>

            {addedToCart && (
              <Alert className="bg-sage/20 text-sage border-sage">
                <AlertDescription className="flex items-center">
                  Item added to your cart!
                  <Link href="/cart" className="ml-2 underline">
                    View Cart
                  </Link>
                </AlertDescription>
              </Alert>
            )}

            {isOutOfStock ? (
              <Button disabled className="w-full">
                <AlertCircle className="mr-2 h-4 w-4" />
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-terracotta hover:bg-terracotta/80 text-white"
                onClick={handleAddToCart}
                disabled={isProductInCart(
                  product.id,
                  selectedVariant?.id ?? undefined
                )}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-[#FAF9F6]">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="flex-1 bg-[#FAF9F6]">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="font-medium">SKU:</span>
              <span className="ml-2 text-muted-foreground">
                {selectedVariant?.sku ?? product.sku ?? "N/A"}
              </span>
            </div>
            {product.category && (
              <div className="flex items-start">
                <span className="font-medium">Category:</span>
                <div className="ml-2">
                  <Link
                    href={`/search?categoriesFilter=${product.category.name}`}
                    className="text-muted-foreground hover:text-terracotta hover:underline"
                  >
                    {product.category.name}
                  </Link>
                </div>
              </div>
            )}
            {product.tags && (
              <div className="flex items-start">
                <span className="font-medium">Tags:</span>
                <div className="ml-2 flex flex-wrap gap-1">
                  {product.tags.map((tag: Tag) => (
                    <Link
                      key={tag.id}
                      href={`/search?tags=${tag.name}`}
                      className="text-muted-foreground hover:text-terracotta hover:underline"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 md:col-span-2 lg:col-span-1">
          <SellerInfo
            seller={{
              id: product.store.id,
              name: product.store.name,
              image:
                product.store.image &&
                typeof product.store.image === "object" &&
                product.store.image.url
                  ? { url: product.store.image.url ?? "" }
                  : null,
              rating: product.reviews?.length
                ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
                  product.reviews.length
                : 0,
              reviewCount: product.reviews?.length ?? 0,
            }}
          />

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Shipping & Returns</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>• Free shipping on orders over $50</li>
              <li>• Standard shipping: 3-5 business days</li>
              <li>• Express shipping: 1-2 business days</li>
              <li>
                •{" "}
                {product.refundPolicy === "no-refunds"
                  ? "No refunds"
                  : `${product.refundPolicy} return policy`}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-terracotta data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-terracotta data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-terracotta data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Shipping & Returns
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-4">
          <div className="prose max-w-none">
            <p>{product.description ?? "No description provided."}</p>
            <h3>Product Features</h3>
            <ul>
              <li>Handcrafted with natural materials</li>
              <li>Unique design - no two pieces are exactly alike</li>
              <li>Ethically sourced components</li>
              <li>Made with love and positive intentions</li>
            </ul>
            <h3>Care Instructions</h3>
            <p>
              To keep your item looking its best, avoid direct sunlight for
              prolonged periods and dust gently with a soft cloth. Do not use
              harsh chemicals for cleaning.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-4" id="reviews">
          <Reviews
            reviews={product.reviews ?? []}
            averageRating={
              product.reviews?.length
                ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
                  product.reviews.length
                : 0
            }
            totalReviews={product.reviews?.length ?? 0}
          />
        </TabsContent>
        <TabsContent value="shipping" className="pt-4">
          <div className="prose max-w-none">
            <h3>Shipping Information</h3>
            <p>We offer the following shipping options:</p>
            <ul>
              <li>Standard Shipping (3-5 business days): $4.99</li>
              <li>Express Shipping (1-2 business days): $9.99</li>
              <li>Free shipping on all orders over $50</li>
            </ul>
            <p>
              Please note that shipping times are estimates and may vary
              depending on your location. All orders are processed within 1-2
              business days.
            </p>
            <h3>Return Policy</h3>
            <p>
              We accept returns within{" "}
              {product.refundPolicy === "no-refunds"
                ? "no time frame"
                : product.refundPolicy}{" "}
              for unused items in their original packaging. To initiate a
              return, please contact our customer service team.
            </p>
            <p>
              Custom or personalized items cannot be returned unless there is a
              defect in the product. Shipping costs are non-refundable.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <RelatedProducts
            products={relatedProducts.map(p => ({
              ...p,
              image:
                p.image && typeof p.image === "object" && p.image.url
                  ? { url: p.image.url ?? "" }
                  : null,
            }))}
          />
        </div>
      )}
    </div>
  );
};
