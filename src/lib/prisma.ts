// Import the PrismaClient from the @prisma/client package
import { PrismaClient } from "@prisma/client";

// Extend the globalThis object to include a prisma property for singleton pattern
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Export the prisma instance, creating it if it doesn't exist
// This ensures a single PrismaClient instance is used across the application
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"], // Log only error messages
  });

// In development mode, store the prisma instance on the global object
// to prevent multiple instances during hot reloading
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
