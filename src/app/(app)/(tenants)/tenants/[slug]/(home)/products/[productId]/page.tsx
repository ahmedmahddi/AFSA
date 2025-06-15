import { Skeleton } from "@/components/ui/skeleton";
import { ProductView } from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ productId: string; slug: string }>;
}

const Page = async ({ params }: Props) => {
  const { productId, slug } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <ProductView productId={productId} storeSlug={slug} /> */}
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="px-4 py-8 md:px-6 md:py-12">
            <Suspense fallback={<ProductSkeleton />}>
              <ProductView productId={productId} storeSlug={slug} />
            </Suspense>
          </div>
        </main>
      </div>
    </HydrationBoundary>
  );
};

function ProductSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-1">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="mt-4 flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-20 w-20 rounded-md" />
          ))}
        </div>
      </div>
      <div className="space-y-6 md:col-span-1">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-24 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-6 md:col-span-2 lg:col-span-1">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-60 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default Page;
