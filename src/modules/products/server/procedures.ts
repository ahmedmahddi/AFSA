import z from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import { Category, Media, Tag, Tenant } from "@/payload-types";

import { sortValues } from "../search-params";

import { DEFAULT_LIMIT } from "@/constants";

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.findByID({
        collection: "products",
        id: input.id,
        depth: 3,
      });

      return {
        ...product,
        image: product.images?.[0]?.image as Media | null,
        images: product.images?.map(img => ({
          url: typeof img.image === "string" ? img.image : img.image?.url ?? "",
          alt: img.alt ?? "",
        })) ?? [],
        store: product.store as Tenant & { image: Media | null },
        category: product.category as Category | null,
        tags: product.tags as Tag[] | null,
        reviews: product.reviews ?? [],
        variants: product.variants ?? [],
      };
    }),
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        categoriesFilter: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        storeSlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      if (input.sort === "curated") {
        sort = "-createdAt";
      }
      if (input.sort === "hot_and_new") {
        sort = "+createdAt";
      }
      if (input.sort === "trending") {
        sort = "-createdAt";
      }

      if (input.minPrice && input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
          greater_than_equal: input.minPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      }

      if (input.storeSlug) {
        where["store.slug"] = {
          equals: input.storeSlug,
        };
      }

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formatedData = categoriesData.docs.map(doc => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map(doc => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subcategoriesSlugs = [];
        const parentCategory = formatedData[0];

        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(subcategory => subcategory.slug)
          );
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          };
        }
      }
      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      if (input.categoriesFilter && input.categoriesFilter.length > 0) {
        where["category.name"] = {
          in: input.categoriesFilter,
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      return {
        ...data,
        docs: data.docs.map(doc => ({
          ...doc,
          image: doc.images?.[0]?.image as Media | null,
          store: doc.store as Tenant & { image: Media | null },
        })),
      };
    }),
  getRelated: baseProcedure
    .input(
      z.object({
        productId: z.string(),
        categorySlug: z.string().nullable().optional(),
        storeSlug: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        limit: z.number().default(4),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {
        id: { not_equals: input.productId },
      };

      if (input.categorySlug) {
        where["category.slug"] = { equals: input.categorySlug };
      }
      if (input.storeSlug) {
        where["store.slug"] = { equals: input.storeSlug };
      }
      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = { in: input.tags };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        where,
        limit: input.limit,
        sort: "-createdAt",
      });

      return data.docs.map(doc => ({
        ...doc,
        image: doc.images?.[0]?.image as Media | null,
        images: doc.images?.map(img => ({
          url: typeof img.image === "string" ? img.image : img.image?.url ?? "",
          alt: img.alt ?? "",
        })) ?? [],
        store: doc.store as Tenant & { image: Media | null },
        category: doc.category as Category | null,
        tags: doc.tags as Tag[] | null,
        reviews: doc.reviews ?? [],
        variants: doc.variants ?? [],
      }));
    }),
});