"use client";
import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center  gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full ">
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center bg-terracotta rounded-[0px_9999px_9999px_0px] w-12 h-12">
          <SearchIcon className="text-white w-6 h-6" />
        </div>

        <Input
          className="px-4 pr-14 rounded-full"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>

      <Button
        variant="outline"
        className="size-12 shrink-0 flex bg-transparent font-semibold border-2 border-terracotta hover:bg-transparent rounded-full hover:border-2 hover:border-sage hover:text-sage  px-3.5 text-xl text-terracotta "
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>

      {session.data?.user && (
        <Button asChild variant="elevated">
          <Link href="/library">
            <BookmarkCheckIcon className="mr-2" />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};
