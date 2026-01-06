import { prisma } from "../db/prisma";

async function main() {
  try {
    const productCount = await prisma.product.count();
    console.log(`Successfully connected. Product count: ${productCount}`);
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }
}

main();
