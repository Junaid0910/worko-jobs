import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

// Use a Proxy to lazy-load the Prisma client. 
// This prevents the PrismaClient constructor from being called during the Next.js build phase,
// which often fails if the DATABASE_URL environment variable is not present.
export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    if (prop === 'constructor') return Object.prototype.constructor;
    if (prop === '$$typeof') return undefined; // For React-related checks
    
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = prismaClientSingleton();
    }
    return (globalForPrisma.prisma as any)[prop];
  }
});

