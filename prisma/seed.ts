import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const filePath = "/Users/emils/sylara_migration/scraped_content.json";
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(rawData);

  console.log(`Loaded ${data.length} entries from scraped_content.json`);

  // First pass: Create Categories
  const collections = data.filter((e: any) => e.url.includes("/collections/"));
  for (const entry of collections) {
    const slug = entry.url.split("/").pop()?.replace(".html", "") || "all";
    const name = entry.text_copy.find((t: any) => t.tag === "h1")?.text || entry.title.replace(" – SYLARA", "").trim();
    
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { slug, name },
    });
  }

  // Second pass: Create Products and Link to Categories
  const productEntries = data.filter((e: any) => e.url.includes("/products/"));
  for (const entry of productEntries) {
    const { url, title, text_copy, images } = entry;
    const slug = url.split("/").pop()?.replace(".html", "");
    if (!slug) continue;

    const name = text_copy.find((t: any) => t.tag === "h1")?.text || title.trim();
    const description = text_copy
      .filter((t: any) => t.tag === "p" && t.text.length > 50)
      .map((t: any) => t.text)
      .join("\n\n");
    
    let price = 0;
    const priceEntry = text_copy.find((t: any) => t.text.includes("Regular price") || t.text.includes("Sale price"));
    if (priceEntry) {
      const priceMatch = priceEntry.text.match(/€(\d+[,.]\d+)/);
      if (priceMatch) {
        price = parseFloat(priceMatch[1].replace(",", "."));
      }
    }

    // Find categories this product belongs to
    const categories = [];
    for (const collEntry of collections) {
        if (collEntry.text_copy.some((t: any) => t.text === name)) {
            const collSlug = collEntry.url.split("/").pop()?.replace(".html", "");
            if (collSlug) categories.push({ slug: collSlug });
        }
    }

    await prisma.product.upsert({
      where: { slug },
      update: {
        name,
        description,
        price,
        images: images || [],
        categories: {
            connect: categories
        }
      },
      create: {
        slug,
        name,
        description,
        price,
        images: images || [],
        categories: {
            connect: categories
        }
      },
    });
    console.log(`Upserted Product: ${name} with ${categories.length} categories`);
  }

  // Handle Blogs and Pages as before...
  for (const entry of data) {
    const { url, title, text_copy, images, videos } = entry;
    const slug = url.split("/").pop()?.replace(".html", "") || "index";

    if (url.includes("/blogs/")) {
      const blogTitle = text_copy.find((t: any) => t.tag === "h1")?.text || title.trim();
      const content = text_copy
        .filter((t: any) => (t.tag === "p" || t.tag === "h2" || t.tag === "h3") && !t.text.includes("EUR") && !t.text.includes("Total items"))
        .map((t: any) => `<${t.tag}>${t.text}</${t.tag}>`)
        .join("\n");

      await prisma.blogPost.upsert({
        where: { slug },
        update: { title: blogTitle, content, images: images || [] },
        create: { slug, title: blogTitle, content, images: images || [] },
      });
    } else if (!url.includes("/products/") && !url.includes("/collections/")) {
      await prisma.staticPage.upsert({
        where: { url },
        update: { title: title.trim(), content: text_copy, images: images || [], videos: videos || [] },
        create: { url, title: title.trim(), content: text_copy, images: images || [], videos: videos || [] },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
