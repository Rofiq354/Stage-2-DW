import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedSuppliers() {
  await prisma.supplier.createMany({
    data: [
      { name: "Supplier A", noTelp: "08123456789" },
      { name: "Supplier B", noTelp: "08342321223" },
      { name: "Supplier C", noTelp: "08453232367" },
      { name: "Supplier D", noTelp: "08743277443" },
      { name: "Supplier E" },
    ],
    skipDuplicates: true,
  });
}
