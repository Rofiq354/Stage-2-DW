import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/**
 * Seeds the users table with two users.
 * The first user is named "User 1" with email "uQHtD@example.com".
 * The second user is named "User 2" with email "l9lVt@example.com".
 * If the users already exist in the database, this function does not do anything.
 */
export async function seedUsers() {
  await prisma.user.createMany({
    data: [
      {
        name: "User 1",
        email: "uQHtD@example.com",
        points: 500
      },
      {
        name: "User 2",
        email: "l9lVt@example.com",
        points: 100
      },
    ],
    skipDuplicates: true,
  });
}
