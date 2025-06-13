"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Caveat } from "next/font/google";

import Link from "next/link";
// import { usePathname } from "next/navigation";

import { useState } from "react";
import {
  LogOutIcon,
  MenuIcon,
  UserIcon,
  SearchIcon,
  ShoppingCart,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { NavbarSidebar } from "./navbar-sidebar";
import { Categories } from "./search-filters/categories";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

// interface NavbarItemProps {
//   href: string;
//   children: React.ReactNode;
//   isActive?: boolean;
// }

// const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
//   return (
//     <Button
//       asChild
//       variant="outline"
//       className={cn(
//         "bg-transparent font-semibold border-2 border-sage hover:bg-transparent rounded-full hover:border-2 hover:border-terracotta hover:text-terracotta  px-3.5 text-xl text-sage ",
//         isActive &&
//           "border-2 border-terracotta bg-transparent text-terracotta hover:border-sage hover:bg-transparent hover:text-sage"
//       )}
//     >
//       <Link href={href}>{children}</Link>
//     </Button>
//   );
// };
const navbarItems = [
  {
    href: "/",
    Children: "Categories",
  },
];

export const Navbar = () => {
  // const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  return (
    <header className="sticky top-0 z-50 w-full border-b-0 bg-bg backdrop-blur-md ">
      <nav className="h-20 flex border-b-0 justify-between font-medium   ">
        <Link href="/" className="px-4 flex items-center">
          <span
            className={cn(
              "text-6xl font-semibold text-terracotta uppercase",
              caveat.className
            )}
          >
            AF
            <span
              className={cn(
                "text-6xl font-semibold text-sage uppercase",
                caveat.className
              )}
            >
              S
            </span>
            <span
              className={cn(
                "text-6xl font-semibold text-terracotta uppercase",
                caveat.className
              )}
            >
              A
            </span>
          </span>
        </Link>

        <NavbarSidebar
          items={navbarItems}
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
        />

        {/* <div className="pl-4 gap-4 relative flex flex-row justify-between">
        <div className="items-center gap-4 hidden lg:flex flex-1">
          {navbarItems.map(item => (
            <NavbarItem
              key={item.href}
              href={item.href}
              isActive={pathname === item.href}
            >
              {item.Children}
            </NavbarItem>
          ))}
        </div>
      </div> */}

        <div className="hidden lg:block">
          <Categories data={data} />
        </div>

        <div className="hidden lg:flex px-4  items-center gap-4 flex-1 justify-center">
          <div className="relative w-full ">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center bg-terracotta rounded-[0px_9999px_9999px_0px] w-12 h-12 ">
              <SearchIcon className="text-white w-6 h-6" />
            </div>

            <Input
              className="pl-4 rounded-full"
              placeholder="Search products"
            />
          </div>
        </div>

        {session.data?.user ? (
          // <div className="hidden lg:flex py-4 gap-4 px-3.5">
          //   <Button
          //     asChild
          //     className="bg-transparent font-semibold border-2 border-sage hover:bg-transparent rounded-full hover:border-2 hover:border-terracotta hover:text-terracotta  px-3.5 text-xl text-sage "
          //   >
          //     <Link href="/admin">Dashboard</Link>
          //   </Button>
          // </div>
          <div className="hidden lg:flex py-4 gap-4 px-3.5">
            <Button
              variant="outline"
              className="size-12 border-0 rounded-full bg-transparent text-terracotta hover:text-sage "
            >
              <Heart strokeWidth={3} />
            </Button>
            <Button
              variant="ghost"
              className="size-12 border-0 rounded-full bg-transparent text-terracotta"
            >
              <ShoppingBag strokeWidth={3} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative size-12 shrink-0 flex bg-transparent font-semibold border-2 border-terracotta hover:bg-transparent rounded-full hover:border-2 hover:border-sage hover:text-sage  px-3.5 text-xl text-terracotta  "
                >
                  <UserIcon className="h-5 w-5" strokeWidth={3} />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{session.data.user.username}</span>
                    <span className="text-xs text-muted-foreground">
                      {session.data.user.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin">Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {}} className="text-red-500">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="hidden lg:flex py-4 gap-4 px-3.5">
            <Button
              variant="outline"
              className="size-12 border-0 rounded-full bg-transparent text-terracotta hover:text-sage  "
            >
              <Heart strokeWidth={3} />
            </Button>
            <Button
              variant="outline"
              className="size-12 border-0 rounded-full bg-transparent text-terracotta hover:text-sage "
            >
              <ShoppingBag strokeWidth={3} />
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent font-semibold border-2 border-terracotta hover:bg-transparent rounded-full hover:border-2 hover:border-sage hover:text-sage  px-3.5 text-xl text-terracotta  "
            >
              <Link prefetch href="/sign-in">
                Log in
              </Link>
            </Button>
            <Button
              asChild
              className="bg-transparent font-semibold border-2 border-terracotta hover:bg-transparent rounded-full hover:border-2 hover:border-sage hover:text-sage  px-3.5 text-xl text-terracotta  "
            >
              <Link prefetch href="/sign-up">
                Start Selling
              </Link>
            </Button>
          </div>
        )}

        <div className="flex lg:hidden gap-1 items-center justify-center px-4">
          <Button
            variant="outline"
            className="size-12 border-0 rounded-full bg-transparent text-terracotta hover:text-sage  "
            onClick={() => setIsSidebarOpen(true)}
          >
            <Heart strokeWidth={3} />
          </Button>
          <Button
            variant="outline"
            className="size-12 border-0 rounded-full bg-transparent text-terracotta hover:text-sage "
            onClick={() => setIsSidebarOpen(true)}
          >
            <ShoppingCart strokeWidth={3} />
          </Button>
          <Button
            variant="outline"
            className="size-12 border-0 rounded-full bg-transparent text-terracotta hover:text-sage "
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon strokeWidth={3} />
          </Button>
        </div>
      </nav>
    </header>
  );
};
