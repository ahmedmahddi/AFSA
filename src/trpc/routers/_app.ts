import { authRouter } from "@/modules/auth/server/procedures";
import { createTRPCRouter } from "../init";
import {
  categoriesFilterRouter,
  categoriesRouter,
} from "@/modules/categories/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { tagsRouter } from "@/modules/tags/server/procedures";
import { tenantsRouter } from "@/modules/tenants/server/procedures";
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  products: productsRouter,
  auth: authRouter,
  tags: tagsRouter,
  categoriesFilter: categoriesFilterRouter,
  tenants: tenantsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
