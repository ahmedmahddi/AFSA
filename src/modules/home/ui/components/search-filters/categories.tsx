"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoriesSidebar } from "./categories-sidebar";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useParams } from "next/navigation";
import { Caveat } from "next/font/google";

interface Props {
  data: CategoriesGetManyOutput;
}
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const Categories = ({ data }: Props) => {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam ?? "all";

  const activeCategoryIndex = data.findIndex(
    cat => cat.slug === activeCategory
  );

  const isActiveCategorHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  return (
    <div className="relative w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {/* Visible items */}
      <div
        ref={containerRef}
        className="flex flex-wrap items-center py-4 px-4"
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        <div ref={viewAllRef} className="shrink-0">
          <Button
            variant="outline"
            className={cn(
              "bg-transparent font-semibold border-2 border-terracotta hover:bg-transparent rounded-full hover:border-2 hover:border-sage hover:text-sage  px-3.5 text-xl text-terracotta  ",
              isActiveCategorHidden &&
                !isAnyHovered &&
                "border-2 border-terracotta bg-transparent text-terracotta hover:border-sage hover:bg-transparent hover:text-sage",
              caveat.className
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            Categories
          </Button>
        </div>
      </div>
    </div>
  );
};
