import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const client = new PrismaClient();

export async function seedCreate() {
    const adminRole = await client.role.create({ data: {
        name: 'Admin'
    }});

    const username = 'Ilya_Kremniou';
    await client.user.create({
        data: {
            email: 'cvobodne@yandex.ru',
            password: bcrypt.hashSync('passwd', username.length),
            username: username,
            role: {
                connect: {
                    id: adminRole.id
                }
            }
        }
    })
}

seedCreate().then(() => {
    console.log('[SeedCreate] Seed create succeeded.')
    client.$disconnect();
}, (error) => {
    console.log(`[SeedCreate] Seed create failed: ${error}.`);
    client.$disconnect();
});


