import { PrismaClient } from "@prisma/client";

export async function seedPosts(prisma: PrismaClient) {
  for (let i = 1; i <= 5; i++) {
    await prisma.post.create({
      data: {
        title: `Post Title ${i}`,
        content: `This is the content for post ${i}.`,
        published: i % 2 === 0, // Alternate published status
        authorId: i, // Assuming user IDs start from 1
        categories: {
          connect: [
            { id: (i % 5) + 1 }, // Connect to categories cyclically
            { id: ((i + 1) % 5) + 1 },
          ],
        },
      },
    });
  }
}
