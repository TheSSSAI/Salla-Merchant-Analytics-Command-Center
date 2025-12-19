import { PrismaClient } from '@prisma/client';

/**
 * Database Seeder
 * 
 * Responsibilities:
 * 1. Ensure system-critical static data (Roles) exists in all environments.
 * 2. Populate test/demo data in non-production environments for development efficiency.
 * 3. Idempotent execution (safe to run multiple times).
 */

const prisma = new PrismaClient();

// System Roles definition based on RBAC requirements (REQ-FUN-201, REQ-OVR-003)
const SYSTEM_ROLES = [
  { name: 'Owner', description: 'Full access to merchant account and team management' },
  { name: 'Admin', description: 'Access to all features except critical team management functions' },
  { name: 'Analyst', description: 'Read-only access to analytics and reports' },
  { name: 'Marketer', description: 'Access to marketing features and campaign management' },
];

async function main() {
  console.log(`Start seeding ...`);

  // --- 1. Seed System Roles (Critical Path) ---
  console.log('Seeding System Roles...');
  
  // We utilize a map to store created roles for potential use in dev seeding
  const roleMap = new Map<string, string>();

  for (const role of SYSTEM_ROLES) {
    // Upsert ensures idempotency: create if not exists, do nothing if exists
    // Assumes 'name' is a unique field in the Role model
    const roleRecord = await prisma.role.upsert({
      where: { name: role.name },
      update: {}, // No updates needed if it exists
      create: {
        name: role.name,
        // Description field is assumed based on standard RBAC models, 
        // if schema doesn't have it, Prisma will ignore extra fields if typed correctly, 
        // but here we rely on the schema allowing it or just seeding the name.
        // Given the strictness, we will assume 'name' is the key.
        // If description exists in schema, we would add it. 
        // For safety in this generated code, we stick to the core identifier 'name'.
      },
    });
    
    roleMap.set(role.name, roleRecord.id);
    console.log(`Created or Found Role: ${role.name}`);
  }

  // --- 2. Seed Development Data (Non-Production Only) ---
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.log('Detected non-production environment. Seeding demo data...');

    // 2.1 Create Demo User
    const demoEmail = 'owner@demo-store.com';
    const demoUser = await prisma.user.upsert({
      where: { email: demoEmail },
      update: {},
      create: {
        email: demoEmail,
        // In a real app, this would be a hashed password. 
        // Providing a placeholder hash for 'password123'
        passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$PZ...placeholder...hash', 
      },
    });
    console.log(`Seeded User: ${demoUser.email}`);

    // 2.2 Create Demo Merchant Account
    const demoSallaId = '123456789';
    const demoMerchant = await prisma.merchantAccount.upsert({
      where: { sallaStoreId: demoSallaId },
      update: {},
      create: {
        accountName: 'Salla Analytics Demo Store',
        sallaStoreId: demoSallaId,
        // Additional required fields would be initialized here
      },
    });
    console.log(`Seeded Merchant: ${demoMerchant.accountName}`);

    // 2.3 Link User to Merchant as Owner
    // This requires the UserMerchantAccount join table (or similar relation)
    // We assume the standard relation 'userMerchantAccounts' or similar exists based on ERD
    const ownerRoleId = roleMap.get('Owner');

    if (ownerRoleId) {
      // Check if link exists to maintain idempotency
      const existingLink = await prisma.userMerchantAccount.findFirst({
        where: {
          userId: demoUser.id,
          merchantAccountId: demoMerchant.id,
        },
      });

      if (!existingLink) {
        await prisma.userMerchantAccount.create({
          data: {
            userId: demoUser.id,
            merchantAccountId: demoMerchant.id,
            roleId: ownerRoleId,
          },
        });
        console.log(`Linked User ${demoUser.email} to Merchant ${demoMerchant.accountName} as Owner`);
      } else {
        console.log(`User ${demoUser.email} already linked to Merchant.`);
      }
    } else {
      console.warn('Owner role not found, skipping user-merchant linkage.');
    }
  } else {
    console.log('Production environment detected. Skipping demo data seeding.');
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });