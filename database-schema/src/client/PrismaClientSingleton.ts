import { PrismaClient } from '@prisma/client';

/**
 * Definition of the global object extension to include the Prisma instance.
 * This is necessary to prevent multiple instances of Prisma Client in development
 * when Hot Module Replacement (HMR) reloads the code.
 */
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

/**
 * Singleton service for managing the Prisma Client instance.
 * 
 * This class ensures that only one instance of PrismaClient is created and reused
 * across the application lifecycle. This is critical for serverless environments (like Vercel)
 * to prevent database connection exhaustion errors ("Too many connections").
 * 
 * It also handles the persistence of the client instance across hot-reloads in 
 * development environments by attaching it to the global scope.
 */
export class PrismaClientSingleton {
    /**
     * The single active instance of the PrismaClient.
     */
    private static instance: PrismaClient | undefined;

    /**
     * Private constructor to prevent direct instantiation of the class.
     * Use the {@link getInstance} method to access the client.
     */
    private constructor() { }

    /**
     * Retrieves the singleton instance of the PrismaClient.
     * 
     * If an instance already exists (either in the static property or the global scope),
     * it returns that instance. Otherwise, it initializes a new client with the 
     * appropriate configuration for the current environment.
     * 
     * @returns {PrismaClient} The active, type-safe Prisma Client instance.
     */
    public static getInstance(): PrismaClient {
        // 1. Check if the static instance is already initialized
        if (PrismaClientSingleton.instance) {
            return PrismaClientSingleton.instance;
        }

        // 2. In development, check the global object to persist connection across HMR
        if (process.env.NODE_ENV !== 'production' && globalForPrisma.prisma) {
            PrismaClientSingleton.instance = globalForPrisma.prisma;
            return globalForPrisma.prisma;
        }

        // 3. Define logging configuration based on the environment
        // In development, we want detailed query logs for debugging.
        // In production, we only want to log errors and warnings to reduce noise and overhead.
        const logConfiguration = process.env.NODE_ENV === 'development'
            ? ['query', 'info', 'warn', 'error'] as const
            : ['error', 'warn'] as const;

        // 4. Initialize a new Prisma Client instance
        // The URL is automatically picked up from the DATABASE_URL environment variable
        // by the Prisma internals, but it can be overridden here if necessary.
        const newInstance = new PrismaClient({
            log: logConfiguration,
            errorFormat: 'minimal', // Use minimal error formatting for cleaner logs in production
        });

        // 5. Store the new instance
        PrismaClientSingleton.instance = newInstance;

        // 6. If not in production, attach to global scope to survive HMR
        if (process.env.NODE_ENV !== 'production') {
            globalForPrisma.prisma = newInstance;
        }

        return newInstance;
    }
}