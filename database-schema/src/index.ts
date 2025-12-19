import { PrismaClientSingleton } from "./client/PrismaClientSingleton";

/**
 * PRODUCTION-READY DATA ACCESS ENTRY POINT
 * 
 * This file serves as the public API for the Data Access Library.
 * It enforces the Singleton pattern for the PrismaClient to manage
 * database connection limits efficiently in serverless environments (AWS Lambda/Vercel).
 * 
 * ARCHITECTURAL RESPONSIBILITIES:
 * 1. Export the shared, pooled database client instance (`db`).
 * 2. Re-export all generated TypeScript types (Models, Enums, InputTypes) from `@prisma/client`.
 * 3. Abstract the client instantiation logic from consumers.
 */

// 1. Initialize the Singleton Database Client
// This ensures that hot-reloading in development and warm containers in production
// reuse the same connection pool, preventing connection exhaustion (REQ-SCAL-001).
export const db = PrismaClientSingleton.getInstance();

// 2. Export the Singleton Class (Optional, mostly for testing/mocking contexts)
// Consumers should generally prefer the exported `db` instance.
export { PrismaClientSingleton } from "./client/PrismaClientSingleton";

// 3. Re-export All Prisma Generated Types
// This allows consumers to import types directly from this package
// e.g., import { User, MerchantAccount } from '@acme/db';
// This acts as a Facade to the underlying ORM types, decoupling consumers from the ORM version slightly.
export * from "@prisma/client";

// 4. Type Definitions for Common Use Cases
// Explicitly exporting the PrismaClient type for use in Dependency Injection interfaces
// or function signatures in consuming services.
import { PrismaClient } from "@prisma/client";
export type { PrismaClient } from "@prisma/client";

/**
 * Helper type for Transaction Clients.
 * Useful when passing a transaction scope down to repository methods.
 * 
 * Usage:
 * async function createUser(tx: PrismaTransactionClient, ...) { ... }
 */
export type PrismaTransactionClient = Omit<
    PrismaClient,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;