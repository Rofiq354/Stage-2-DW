import { PrismaClient } from "@prisma/client";

import { seedOrders } from "../seeds/order";
import { seedProducts } from "../seeds/product";
import { seedSuppliers } from "../seeds/supplier";
import { seedUsers } from "../seeds/user";

/**
 * Main function to seed the database.
 * It calls the seedProducts function to create products in the database.
 * After the seeding is done, it logs a success message and exits the process.
 */
async function main() {
  await seedUsers();
  await seedProducts();
  await seedOrders();
  await seedSuppliers();
}

main()
  .then(() => console.log("Data seeded successfully"))
  .finally(async () => {
    process.exit(0);
  });
