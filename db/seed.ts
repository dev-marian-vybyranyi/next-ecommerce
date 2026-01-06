import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import sampleData from "./sample-data";
import "dotenv/config";

async function main() {
  const connectionString = `${process.env.DATABASE_URL}`;

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully!");
}

main();
