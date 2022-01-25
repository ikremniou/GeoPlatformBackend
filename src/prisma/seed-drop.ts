import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export async function seedDrop() {
  await client.user.delete({ where: { username: 'Ilya_Kremniou' } });
  await client.role.delete({ where: { name: 'Admin' } });
}

seedDrop().then(() => {
    console.log('[SeedCreate] Seed create succeeded.')
    client.$disconnect();
}, (error) => {
    console.log(`[SeedCreate] Seed create failed: ${error}.`);
    client.$disconnect();
});
