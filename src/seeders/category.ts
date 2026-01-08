import { PrismaClient } from "@prisma/client";

export async function seedCategories(prisma: PrismaClient) {
  await prisma.category.createMany({
    data: [
      { name: "Technology" },
      { name: "Lifestyle" },
      { name: "Education" },
      { name: "Entertainment" },
      { name: "Health" },
    ],
  });
}
