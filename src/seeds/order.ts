import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seeds the orders table with three orders.
 * The first order is for user 1, product 1, and quantity 2.
 * The second order is for user 1, product 2, and quantity 1.
 * The third order is for user 2, product 1, and quantity 3.
 */
export async function seedOrders() {
  await prisma.order.createMany({
    data: [
      {
        userId: 1,
        productId: 1,
        quantity: 2,
        priceAtOrder: 1000,
      },
      {
        userId: 1,
        productId: 2,
        quantity: 1,
        priceAtOrder: 2000,
      },
      {
        userId: 2,
        productId: 1,
        quantity: 3,
        priceAtOrder: 3000,
      },
    ],
  });
}
