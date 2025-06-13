// trpc
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

//components
import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import {
  SearchFilters,
  SearchFiltersSkeleton,
} from "@/modules/home/ui/components/search-filters";

import { Suspense } from "react";
import { HeroSection } from "@/modules/home/ui/components/hero-section";

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <HeroSection />
      <div className="flex-1 bg-children">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
