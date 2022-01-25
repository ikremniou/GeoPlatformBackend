import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Activity } from 'src/activity/entities/activity.entity';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';
import { CreateClaimDto } from 'src/claims/dto/create-claim.dto';
import { Claim } from 'src/claims/entities/claim.entity';
import { Invite } from 'src/invite/entities/invite.entity';
import { MonthlyTimeReview } from 'src/monthly-time-review/entities/monthly-time-review.entity';
import { Project } from 'src/project/entities/project.entity';
import { Role } from 'src/roles/entities/role.entity';
import { TimeReport } from 'src/time-report/entities/time-report.entity';
import { User } from 'src/users/entities/user.entity';
import { WorkerCategory } from 'src/worker-category/entities/worker-category.entity';
import { WorkerPosition } from 'src/worker-position/entities/worker-position.entity';
import { Worker } from 'src/worker/entities/worker.entity';

const client = new PrismaClient();

export async function seedCreate() {
  let adminRole = await client.role.findUnique({ where: { name: 'Admin' } });
  if (!adminRole) {
    adminRole = await client.role.create({
      data: {
        name: 'Admin',
      },
    });
  }

  const username = 'Ilya_Kremniou';
  const adminUser = await client.user.findUnique({ where: { username } });
  if (!adminUser) {
    await client.user.create({
      data: {
        email: 'cvobodne@yandex.ru',
        password: bcrypt.hashSync('passwd', username.length),
        username: username,
        role: {
          connect: {
            id: adminRole.id,
          },
        },
      },
    });
  }

  const claims: CreateClaimDto[] = [
    { action: AbilityActions.Manage, subject: User.name },
    { action: AbilityActions.Create, subject: User.name },
    { action: AbilityActions.Read, subject: User.name },
    { action: AbilityActions.Update, subject: User.name },
    { action: AbilityActions.Delete, subject: User.name },
    { action: AbilityActions.Manage, subject: Worker.name },
    { action: AbilityActions.Create, subject: Worker.name },
    { action: AbilityActions.Read, subject: Worker.name },
    { action: AbilityActions.Update, subject: Worker.name },
    { action: AbilityActions.Delete, subject: Worker.name },
    { action: AbilityActions.Manage, subject: TimeReport.name },
    { action: AbilityActions.Create, subject: TimeReport.name },
    { action: AbilityActions.Read, subject: TimeReport.name },
    { action: AbilityActions.Update, subject: TimeReport.name },
    { action: AbilityActions.Delete, subject: TimeReport.name },
    { action: AbilityActions.Manage, subject: Role.name },
    { action: AbilityActions.Create, subject: Role.name },
    { action: AbilityActions.Read, subject: Role.name },
    { action: AbilityActions.Update, subject: Role.name },
    { action: AbilityActions.Delete, subject: Role.name },
    { action: AbilityActions.Manage, subject: Project.name },
    { action: AbilityActions.Create, subject: Project.name },
    { action: AbilityActions.Read,   subject: Project.name },
    { action: AbilityActions.Update, subject: Project.name },
    { action: AbilityActions.Delete, subject: Project.name },
    { action: AbilityActions.Manage, subject: MonthlyTimeReview.name },
    { action: AbilityActions.Create, subject: MonthlyTimeReview.name },
    { action: AbilityActions.Read,   subject: MonthlyTimeReview.name },
    { action: AbilityActions.Update, subject: MonthlyTimeReview.name },
    { action: AbilityActions.Delete, subject: MonthlyTimeReview.name },
    { action: AbilityActions.Manage, subject: Invite.name },
    { action: AbilityActions.Create, subject: Invite.name },
    { action: AbilityActions.Read,   subject: Invite.name },
    { action: AbilityActions.Update, subject: Invite.name },
    { action: AbilityActions.Delete, subject: Invite.name },
    { action: AbilityActions.Manage, subject: Claim.name },
    { action: AbilityActions.Create, subject: Claim.name },
    { action: AbilityActions.Read,   subject: Claim.name },
    { action: AbilityActions.Update, subject: Claim.name },
    { action: AbilityActions.Delete, subject: Claim.name },
    { action: AbilityActions.Manage, subject: Activity.name },
    { action: AbilityActions.Create, subject: Activity.name },
    { action: AbilityActions.Read,   subject: Activity.name },
    { action: AbilityActions.Update, subject: Activity.name },
    { action: AbilityActions.Delete, subject: Activity.name },
    { action: AbilityActions.Manage, subject: WorkerPosition.name },
    { action: AbilityActions.Create, subject: WorkerPosition.name },
    { action: AbilityActions.Read,   subject: WorkerPosition.name },
    { action: AbilityActions.Update, subject: WorkerPosition.name },
    { action: AbilityActions.Delete, subject: WorkerPosition.name },
    { action: AbilityActions.Manage, subject: WorkerCategory.name },
    { action: AbilityActions.Create, subject: WorkerCategory.name },
    { action: AbilityActions.Read,   subject: WorkerCategory.name },
    { action: AbilityActions.Update, subject: WorkerCategory.name },
    { action: AbilityActions.Delete, subject: WorkerCategory.name }
  ];
  await Promise.all(
    claims.map(async (claim) => {
      const existingClaim = await client.claim.findFirst({ where: { action: claim.action, subject: claim.subject } });
      if (!existingClaim) {
        await client.claim.create({ data: claim });
      }
    }),
  );
}

seedCreate().then(
  () => {
    console.log('[SeedCreate] Seed create succeeded.');
    client.$disconnect();
  },
  (error) => {
    console.log(`[SeedCreate] Seed create failed: ${error}.`);
    client.$disconnect();
  },
);
