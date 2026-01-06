import { seedProducts } from "./seeds/product";

/**
 * Main function to seed the database.
 * It calls the seedProducts function to create products in the database.
 * After the seeding is done, it logs a success message and exits the process.
 */
async function main() {
  await seedProducts();
  console.log("Data seeded successfully");
}

main().finally(async () => {
  process.exit(0);
});
