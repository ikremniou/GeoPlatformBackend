import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashSync } from 'bcrypt';

export class seeds1627332577762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const role = queryRunner.manager.create(Role, { name: 'Admin' });
    await queryRunner.manager.save(role);

    const hash = hashSync('passwd', 10);
    const admin = queryRunner.manager.create(User, {
      email: 'cvobodne@yandex.ru',
      username: 'Ilya_Kremniou',
      password: hash,
      role: role,
    });
    await queryRunner.manager.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const role = await queryRunner.manager.findOne(Role, { name: 'Admin' });
    await queryRunner.manager.remove(role);

    const admin = await queryRunner.manager.findOne(User, { username: 'Ilya_Kremniou'});
    await queryRunner.manager.remove(admin);
  }
}
