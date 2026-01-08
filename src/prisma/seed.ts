import { PrismaClient } from "@prisma/client";
import { seedUsers } from "../seeders/user";
import { seedCategories } from "../seeders/category";
import { seedPosts } from "../seeders/post";
import { seedComments } from "../seeders/comment";

const prisma = new PrismaClient();

async function main() {
  // Reset database: truncate tables and reset auto-increment IDs
  await prisma.$queryRaw`TRUNCATE TABLE "User", "Post", "Comment", "Category", "_PostCategories" RESTART IDENTITY CASCADE;`;

  await seedUsers(prisma);
  await seedCategories(prisma);
  await seedPosts(prisma);
  await seedComments(prisma);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
