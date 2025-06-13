//trpc
import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";
import { DEFAULT_LIMIT } from "@/constants";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      depth: 1,
      pagination: false,
      where: { parent: { exists: false } },
      sort: "name",
    });
    const formatedData = data.docs.map(doc => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map(doc => ({
        ...(doc as Category),
      })),
    }));
    return formatedData;
  }),
});

export const categoriesFilterRouter = createTRPCRouter({
  getFilters: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "categories",
        page: input.cursor,
        limit: input.limit,
        sort: "name",
      });

      return data;
    }),
});
