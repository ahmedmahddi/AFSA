import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

interface CategoriesFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export const CategoriesFilter = ({
  value,
  onChange,
}: CategoriesFilterProps) => {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchNextPageError } =
    useInfiniteQuery(
      trpc.categoriesFilter.getFilters.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: lastPage => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );
  const OnClick = (categorieFilter: string) => {
    if (value?.includes(categorieFilter)) {
      onChange(value?.filter(t => t !== categorieFilter) ?? []);
    } else {
      onChange([...(value ?? []), categorieFilter]);
    }
  };
  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map(page =>
          page.docs.map(categorieFilter => (
            <div
              key={categorieFilter.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => OnClick(categorieFilter.name)}
            >
              <p className="font-medium">{categorieFilter.name}</p>
              <Checkbox
                checked={value?.includes(categorieFilter.name)}
                onCheckedChange={() => OnClick(categorieFilter.name)}
              />
            </div>
          ))
        )
      )}
      {hasNextPage && (
        <button
          disabled={isFetchNextPageError}
          onClick={() => fetchNextPage()}
          className="underline font-medium justify-start text-start disabled:opacity-50 cursor-pointer"
        >
          Load more...
        </button>
      )}
    </div>
  );
};
