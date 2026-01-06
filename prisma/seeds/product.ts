import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Membuat data produk awal di dalam database.
 * Fungsi ini akan membuat 2 produk dengan nama "Product 1" dan "Product 2" serta harga masing-masing 1000 dan 2000.
 * Jika produk sudah ada di dalam database, maka fungsi ini tidak akan melakukan apapun.
 */
export async function seedProducts() {
  await prisma.product.createMany({
    data: [
      {
        name: "Product 1",
        price: 1000,
      },
      {
        name: "Product 2",
        price: 2000,
      },
    ],
    skipDuplicates: true,
  });
}
