import { getPayload } from "payload";
import configPromise from "@payload-config";

const tags = [
  { name: "Handmade", slug: "handmade" },
  { name: "Organic", slug: "organic" },
  { name: "Vintage", slug: "vintage" },
  { name: "Sustainable", slug: "sustainable" },
  { name: "Minimalist", slug: "minimalist" },
  { name: "Luxury", slug: "luxury" },
  { name: "Eco-Friendly", slug: "eco-friendly" },
  { name: "Customizable", slug: "customizable" },
  { name: "Artisan", slug: "artisan" },
  { name: "Natural", slug: "natural" },
];

const products = [
  { name: "Handwoven Cotton Scarf", description: "Soft, breathable scarf crafted by local weavers.", price: 25.99, categorySlug: "other", tagSlugs: ["handmade", "natural"] },
  { name: "Organic Lavender Soap", description: "Gentle soap made with organic lavender oil.", price: 8.50, categorySlug: "other", tagSlugs: ["organic", "artisan"] },
  { name: "Vintage Ceramic Vase", description: "Unique 1970s ceramic vase for home decor.", price: 45.00, categorySlug: "design", tagSlugs: ["vintage", "artisan"] },
  { name: "Sustainable Bamboo Cutting Board", description: "Durable, eco-friendly kitchen essential.", price: 22.99, categorySlug: "other", tagSlugs: ["sustainable", "eco-friendly"] },
  { name: "Minimalist Leather Wallet", description: "Sleek wallet handmade from full-grain leather.", price: 39.99, categorySlug: "other", tagSlugs: ["minimalist", "handmade"] },
  { name: "Luxury Silk Pillowcase", description: "Smooth silk pillowcase for skin and hair health.", price: 65.00, categorySlug: "other", tagSlugs: ["luxury", "natural"] },
  { name: "Eco-Friendly Reusable Tote Bag", description: "Stylish tote made from recycled materials.", price: 15.99, categorySlug: "other", tagSlugs: ["eco-friendly", "sustainable"] },
  { name: "Customizable Wooden Photo Frame", description: "Engrave your message on this oak frame.", price: 29.99, categorySlug: "design", tagSlugs: ["customizable", "handmade"] },
  { name: "Artisan Olive Oil", description: "Cold-pressed extra virgin olive oil from local farms.", price: 18.50, categorySlug: "other", tagSlugs: ["artisan", "organic"] },
  { name: "Natural Beeswax Candle", description: "Hand-poured candle with a subtle honey scent.", price: 12.99, categorySlug: "other", tagSlugs: ["natural", "handmade"] },
  { name: "Handcrafted Wooden Spoon Set", description: "Set of three carved olive wood spoons.", price: 19.99, categorySlug: "other", tagSlugs: ["handmade", "artisan"] },
  { name: "Organic Cotton T-Shirt", description: "Comfortable tee in earthy tones.", price: 24.99, categorySlug: "other", tagSlugs: ["organic", "sustainable"] },
  { name: "Vintage Brass Pendant Light", description: "Restored mid-century pendant for cozy ambiance.", price: 89.99, categorySlug: "design", tagSlugs: ["vintage", "artisan"] },
  { name: "Sustainable Wool Blanket", description: "Warm, eco-friendly blanket for chilly nights.", price: 79.99, categorySlug: "other", tagSlugs: ["sustainable", "natural"] },
  { name: "Minimalist Ceramic Mug", description: "Hand-thrown mug with a sleek design.", price: 14.99, categorySlug: "design", tagSlugs: ["minimalist", "handmade"] },
  { name: "Luxury Cashmere Scarf", description: "Ultra-soft scarf in a timeless gray shade.", price: 120.00, categorySlug: "other", tagSlugs: ["luxury", "natural"] },
  { name: "Eco-Friendly Bamboo Straw Set", description: "Set of six reusable straws with cleaning brush.", price: 9.99, categorySlug: "other", tagSlugs: ["eco-friendly", "sustainable"] },
  { name: "Customizable Leather Journal", description: "Personalized journal with embossed initials.", price: 49.99, categorySlug: "other", tagSlugs: ["customizable", "handmade"] },
  { name: "Artisan Dark Chocolate Bar", description: "70% cocoa bar with sea salt flakes.", price: 6.99, categorySlug: "other", tagSlugs: ["artisan", "organic"] },
  { name: "Natural Linen Apron", description: "Durable apron for cooking and crafting.", price: 29.99, categorySlug: "other", tagSlugs: ["natural", "handmade"] },
  { name: "Handmade Macrame Wall Hanging", description: "Boho-chic decor piece for any room.", price: 39.99, categorySlug: "design", tagSlugs: ["handmade", "artisan"] },
  { name: "Organic Herbal Tea Blend", description: "Calming blend of chamomile and mint.", price: 10.99, categorySlug: "other", tagSlugs: ["organic", "natural"] },
  { name: "Vintage Wool Rug", description: "Handwoven rug with intricate patterns.", price: 199.99, categorySlug: "design", tagSlugs: ["vintage", "artisan"] },
  { name: "Sustainable Cork Yoga Mat", description: "Non-slip mat for eco-conscious yogis.", price: 59.99, categorySlug: "yoga", tagSlugs: ["sustainable", "eco-friendly"] },
  { name: "Minimalist Stainless Steel Watch", description: "Timeless watch with a clean dial.", price: 89.99, categorySlug: "other", tagSlugs: ["minimalist", "luxury"] },
  { name: "Luxury Rosewood Chess Set", description: "Handcrafted chess board and pieces.", price: 149.99, categorySlug: "other", tagSlugs: ["luxury", "artisan"] },
  { name: "Eco-Friendly Glass Water Bottle", description: "Sleek bottle with silicone sleeve.", price: 19.99, categorySlug: "other", tagSlugs: ["eco-friendly", "sustainable"] },
  { name: "Customizable Silver Necklace", description: "Engraved pendant with adjustable chain.", price: 45.99, categorySlug: "other", tagSlugs: ["customizable", "handmade"] },
  { name: "Artisan Sourdough Bread Kit", description: "Everything you need for homemade bread.", price: 24.99, categorySlug: "other", tagSlugs: ["artisan", "organic"] },
  { name: "Natural Bamboo Toothbrush Set", description: "Pack of four biodegradable toothbrushes.", price: 12.99, categorySlug: "other", tagSlugs: ["natural", "eco-friendly"] },
  { name: "Handmade Pottery Bowl", description: "Rustic bowl for soups and salads.", price: 29.99, categorySlug: "design", tagSlugs: ["handmade", "artisan"] },
  { name: "Organic Matcha Powder", description: "Premium-grade matcha for vibrant lattes.", price: 22.99, categorySlug: "other", tagSlugs: ["organic", "natural"] },
  { name: "Vintage Leather Armchair", description: "Restored chair with rich patina.", price: 499.99, categorySlug: "design", tagSlugs: ["vintage", "luxury"] },
  { name: "Sustainable Hemp Backpack", description: "Durable bag for everyday use.", price: 69.99, categorySlug: "other", tagSlugs: ["sustainable", "eco-friendly"] },
  { name: "Minimalist Wall Clock", description: "Silent clock with wooden hands.", price: 34.99, categorySlug: "design", tagSlugs: ["minimalist", "handmade"] },
  { name: "Luxury Marble Coaster Set", description: "Set of four polished marble coasters.", price: 39.99, categorySlug: "other", tagSlugs: ["luxury", "artisan"] },
  { name: "Eco-Friendly Beeswax Wraps", description: "Reusable wraps for food storage.", price: 15.99, categorySlug: "other", tagSlugs: ["eco-friendly", "sustainable"] },
  { name: "Customizable Wooden Coasters", description: "Set of six with laser-engraved designs.", price: 24.99, categorySlug: "design", tagSlugs: ["customizable", "handmade"] },
  { name: "Artisan Honey Jar", description: "Raw wildflower honey from local beekeepers.", price: 14.99, categorySlug: "other", tagSlugs: ["artisan", "natural"] },
  { name: "Natural Jute Doormat", description: "Sturdy mat with woven texture.", price: 29.99, categorySlug: "other", tagSlugs: ["natural", "handmade"] },
  { name: "Handmade Knit Beanie", description: "Cozy wool beanie in neutral tones.", price: 19.99, categorySlug: "other", tagSlugs: ["handmade", "artisan"] },
  { name: "Organic Coconut Oil", description: "Cold-pressed oil for cooking and skincare.", price: 12.99, categorySlug: "other", tagSlugs: ["organic", "natural"] },
  { name: "Vintage Typewriter", description: "Restored 1960s typewriter for collectors.", price: 249.99, categorySlug: "other", tagSlugs: ["vintage", "artisan"] },
  { name: "Sustainable Wooden Sunglasses", description: "Stylish shades with bamboo frames.", price: 79.99, categorySlug: "other", tagSlugs: ["sustainable", "eco-friendly"] },
  { name: "Minimalist Desk Organizer", description: "Wooden organizer for a tidy workspace.", price: 34.99, categorySlug: "design", tagSlugs: ["minimalist", "handmade"] },
  { name: "Luxury Velvet Cushion", description: "Plush cushion in deep emerald green.", price: 49.99, categorySlug: "design", tagSlugs: ["luxury", "artisan"] },
  { name: "Eco-Friendly Cotton Napkins", description: "Set of four reusable napkins.", price: 14.99, categorySlug: "other", tagSlugs: ["eco-friendly", "sustainable"] },
  { name: "Customizable Pet Collar", description: "Leather collar with engraved name.", price: 24.99, categorySlug: "other", tagSlugs: ["customizable", "handmade"] },
  { name: "Artisan Spice Blend Set", description: "Four unique blends for global cuisines.", price: 29.99, categorySlug: "other", tagSlugs: ["artisan", "organic"] },
  { name: "Natural Reed Diffuser", description: "Subtle lavender scent for any room.", price: 19.99, categorySlug: "other", tagSlugs: ["natural", "handmade"] },
];

const seed = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  // Find or create a default tenant
  let tenantId: string;
  const existingTenants = await payload.find({
    collection: "tenants",
    where: {},
    limit: 1,
  });

  if (existingTenants.docs.length > 0 && existingTenants.docs[0]) {
    tenantId = existingTenants.docs[0].id;
    console.log(`Using existing tenant with ID: ${tenantId}`);
  } else {
    const createdTenant = await payload.create({
      collection: "tenants",
      data: {
        name: "Default Tenant",
        slug: "default-tenant",
        stripeAccountId: "", // Provide a default or test Stripe Account ID as required
      },
    });
    tenantId = createdTenant.id;
    console.log(`Created default tenant with ID: ${tenantId}`);
  }

  // Seed tags
  const tagMap = new Map<string, string>();
  for (const tag of tags) {
    const existingTag = await payload.find({
      collection: "tags",
      where: { name: { equals: tag.name } },
    });
    let tagId: string;
    if (existingTag.docs.length > 0 && existingTag.docs[0]) {
      tagId = existingTag.docs[0].id;
    } else {
      const createdTag = await payload.create({
        collection: "tags",
        data: {
          name: tag.name,
        },
      });
      tagId = createdTag.id;
    }
    tagMap.set(tag.slug, tagId);
  }

  // Seed products
  for (const product of products) {
    // Try finding category by slug
    let category = await payload.find({
      collection: "categories",
      where: { slug: { equals: product.categorySlug } },
    });

    // Fallback to name-based search
    if (category.docs.length === 0 || !category.docs[0]) {
      const categoryName = product.categorySlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      category = await payload.find({
        collection: "categories",
        where: { name: { equals: categoryName } },
      });
    }

    if (category.docs.length === 0 || !category.docs[0]) {
      console.warn(`Category with slug/name ${product.categorySlug} not found, skipping product ${product.name}`);
      continue;
    }

    const categoryId = category.docs[0].id;
    const tagIds = product.tagSlugs
      .map(slug => tagMap.get(slug))
      .filter(id => id) as string[];

    await payload.create({
      collection: "products",
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: categoryId,
        tags: tagIds,
        refundPolicy: "30-day",
        tenant: tenantId, // Assign tenant to product
      },
    });
  }

  console.log("Seeding completed successfully.");
};

await seed();
process.exit(0);