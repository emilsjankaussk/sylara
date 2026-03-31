import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkProduct() {
  const product = await prisma.product.findFirst({
    where: { name: { contains: "Hand & Body Wash Ginger Cardamom" } }
  });

  if (product) {
    console.log("Product found:", product.name);
    console.log("Images:", JSON.stringify(product.images, null, 2));
  } else {
    console.log("Product not found");
  }

  await prisma.$disconnect();
}

checkProduct();
