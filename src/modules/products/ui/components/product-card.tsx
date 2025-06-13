import React from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Heart, StarIcon } from "lucide-react";

import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  description?: string;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  description,
  tenantImageUrl,
  reviewRating,
  reviewCount,
  price,
}: ProductCardProps) => {
  const router = useRouter();
  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(generateTenantURL(tenantSlug));
  };

  return (
    <Card className="overflow-hidden py-0 transition-all hover:shadow-md">
      <div className="relative">
        <Link href={`${generateTenantURL(tenantSlug)}/products/${id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={imageUrl ?? "/placeholder.png"}
              alt={name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 rounded-full bg-white/80 hover:bg-white"
        >
          <Heart className="h-5 w-5 text-terracotta" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <Link href={`${generateTenantURL(tenantSlug)}/products/${id}`}>
          <h3 className="line-clamp-1 font-medium group-hover:text-terracotta">
            {name}
          </h3>
        </Link>
        {reviewCount > 0 && (
          <div className="flex items-center gap-1">
            <StarIcon className="size-3.5 fill-terracotta" />
            <p className="text-sm font-medium">
              {reviewRating} ({reviewCount})
            </p>
          </div>
        )}
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold text-lg text-terracotta">
            {formatCurrency(price)}
          </p>

          <Button
            variant="outline"
            size="sm"
            className="h-8 border-terracotta text-terracotta hover:bg-terracotta/10 hover:text-terracotta"
          >
            Add
          </Button>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleUserClick}
        >
          {tenantImageUrl && (
            <Image
              alt={tenantSlug}
              src={tenantImageUrl}
              width={16}
              height={16}
              className="rounded-full border shrink-0 size-[16px]"
            />
          )}
          <p className=" text-xs text-muted-foreground underline">
            by {tenantSlug}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse" />
  );
};
