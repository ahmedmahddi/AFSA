import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Seller {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  image?: { url: string } | null; // Match Tenant.image
}

interface SellerInfoProps {
  seller: Seller;
}

export function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={seller.image?.url ?? "/placeholder.svg"}
            alt={seller.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-4">
          <h3 className="font-medium">{seller.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-ochre text-ochre" />
              <span className="ml-1 text-sm">{seller.rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {seller.reviewCount} reviews
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2 ">
        <Button variant="outline" className="flex-1 bg-[#FAF9F6]" asChild>
          <Link href={`/tenants/${seller.name}`}>
            <div>View Shop</div>
          </Link>
        </Button>
        <Button variant="outline" className="flex-1 bg-[#FAF9F6]">
          Contact
        </Button>
      </div>
    </div>
  );
}
