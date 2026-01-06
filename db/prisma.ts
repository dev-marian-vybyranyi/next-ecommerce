import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Note: We do NOT import "dotenv/config" here. Next.js handles environment variables automatically.
// Manually importing dotenv in Next.js/Turbopack can cause initialization errors (like "Cannot read properties of undefined (reading 'reduce')").

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Please check your environment variables."
  );
}

const prismaClientSingleton = () => {
  // Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
  const pool = new Pool({ connectionString });

  // Instantiates the Prisma adapter using the pg connection pool.
  const adapter = new PrismaPg(pool);

  // Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        price: {
          compute(product) {
            return product.price.toString();
          },
        },
        rating: {
          compute(product) {
            return product.rating.toString();
          },
        },
      },
    },
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
