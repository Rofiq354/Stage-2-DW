import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.createMany({
    data: [
      { email: "user1@example.com", name: "User One" },
      { email: "user2@example.com", name: "User Two" },
      { email: "user3@example.com", name: "User Three" },
      { email: "user4@example.com", name: "User Four" },
      { email: "user5@example.com", name: "User Five" },
    ],
  });
}
