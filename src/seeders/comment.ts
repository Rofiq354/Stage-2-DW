import { PrismaClient } from "@prisma/client";

export async function seedComments(prisma: PrismaClient) {
  for (let i = 1; i <= 5; i++) {
    await prisma.comment.create({
      data: {
        content: `This is comment ${i} on post ${i}.`,
        postId: i, // Assuming post IDs start from 1
        authorId: (i % 5) + 1, // Cycle through users
      },
    });
  }
}
