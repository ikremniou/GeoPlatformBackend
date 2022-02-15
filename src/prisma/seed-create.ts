import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateActivityInput } from 'src/activity/dto/create-activity.input';
import { Activity } from 'src/activity/entities/activity.entity';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';
import { Claim } from 'src/claims/entities/claim.entity';
import { CreateWorkClientInput } from 'src/client/dto/create-work-client.input';
import { WorkClient } from 'src/client/entities/work-client.entity';
import { Invite } from 'src/invite/entities/invite.entity';
import { CreateProjectInput } from 'src/project/dto/create-project.input';
import { Project } from 'src/project/entities/project.entity';
import { Role } from 'src/roles/entities/role.entity';
import { TimeReport } from 'src/time-report/entities/time-report.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateWorkerCategoryInput } from 'src/worker-category/dto/create-worker-category.input';
import { WorkerCategory } from 'src/worker-category/entities/worker-category.entity';
import { CreateWorkerPositionInput } from 'src/worker-position/dto/create-worker-position.input';
import { WorkerPosition } from 'src/worker-position/entities/worker-position.entity';
import { CreateWorkerInput } from 'src/worker/dto/create-worker.input';
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

  const subjects = [
    User.name,
    Worker.name,
    TimeReport.name,
    Role.name,
    Project.name,
    Invite.name,
    Claim.name,
    Activity.name,
    WorkerPosition.name,
    WorkerCategory.name,
    WorkClient.name,
  ];

  const actions = [
    AbilityActions.Manage,
    AbilityActions.Read,
    AbilityActions.Create,
    AbilityActions.Update,
    AbilityActions.Delete,
  ];

  await Promise.all(
    subjects.map(async (subject) => {
      for (const action of actions) {
        const existingClaim = await client.claim.findFirst({ where: { action, subject } });
        if (!existingClaim) {
          await client.claim.create({ data: { action, subject } });
        }
      }
    }),
  );

  const categories: CreateWorkerCategoryInput[] = [
    { name: 'Рабочие ("Строитель")' },
    { name: 'Служащие ("Строитель")' },
    { name: 'Рабочие ("Витгеострой")' },
    { name: 'Служащие ("Витгеострой")' },
    { name: 'Подрядные ("Строитель ")' },
    { name: 'Подрядные ("Витгеострой")' },
    { name: 'Геологи' },
    { name: 'Ответственные исполнители' },
    { name: 'Сторожа и прочие' },
  ];

  const createdCategories = await Promise.all(
    categories.map(async (category) => {
      const existingCategory = await client.workerCategory.findUnique({ where: { name: category.name } });
      if (!existingCategory) {
        return client.workerCategory.create({ data: category });
      }
      return existingCategory;
    }),
  );

  const positions: CreateWorkerPositionInput[] = [
    { name: 'Бетонщик 2р', baseSalary: 1000 },
    { name: 'Бетонщик 3р', baseSalary: 1000 },
    { name: 'Бетонщик 4р', baseSalary: 1000 },
    { name: 'Бухгалтер 12р', baseSalary: 1000 },
    { name: 'Бухгалтер 16р', baseSalary: 1000 },
    { name: 'Ведущий инженер ПТО', baseSalary: 1000 },
    { name: 'Водитель груз спец гп10т 5р', baseSalary: 1000 },
    { name: 'Водитель груз спец гп40т 5р', baseSalary: 1000 },
    { name: 'Водитель грузов гп1,5т 5р', baseSalary: 1000 },
    { name: 'Водитель грузов гп3т 5р', baseSalary: 1000 },
    { name: 'Водитель легковой 4р', baseSalary: 1000 },
    { name: 'Геолог', baseSalary: 1000 },
    { name: 'Главный бухгалтер', baseSalary: 1000 },
    { name: 'Главный геолог', baseSalary: 1000 },
    { name: 'Главный инженер', baseSalary: 1000 },
    { name: 'Директор', baseSalary: 1000 },
    { name: 'Инженер', baseSalary: 1000 },
    { name: 'Инженер-программист', baseSalary: 1000 },
    { name: 'Инженер-энергетик', baseSalary: 1000 },
    { name: 'Кладовщик', baseSalary: 1000 },
    { name: 'Лаборант 1 категории', baseSalary: 1000 },
    { name: 'Лаборант химического анализа', baseSalary: 1000 },
    { name: 'Мастер', baseSalary: 1000 },
    { name: 'Машинист бур уст 4р', baseSalary: 1000 },
    { name: 'Машинист бур уст 5р', baseSalary: 1000 },
    { name: 'Машинист погрузчика', baseSalary: 1000 },
    { name: 'Машинист экскаватора', baseSalary: 1000 },
    { name: 'Механик', baseSalary: 1000 },
    { name: 'Монтажник строит констр. 4р', baseSalary: 1000 },
    { name: 'Плотник-бетонщик', baseSalary: 1000 },
    { name: 'Подсобный рабочий 2р', baseSalary: 1000 },
    { name: 'Помощник маш бур уст 3р', baseSalary: 1000 },
    { name: 'Помощник маш бур уст 4р', baseSalary: 1000 },
    { name: 'Прораб', baseSalary: 1000 },
    { name: 'Руководитель лаборатории', baseSalary: 1000 },
    { name: 'Слесарь по ремонту техники', baseSalary: 1000 },
    { name: 'Специалист ОК', baseSalary: 1000 },
    { name: 'Сторож', baseSalary: 1000 },
    { name: 'Техник', baseSalary: 1000 },
    { name: 'Техник-электрик', baseSalary: 1000 },
    { name: 'Тракторист', baseSalary: 1000 },
    { name: 'Уборщик помещений', baseSalary: 1000 },
    { name: 'Экономист', baseSalary: 1000 },
    { name: 'Электрик 4р', baseSalary: 1000 },
    { name: 'Электрогазосварщик 4р', baseSalary: 1000 },
    { name: 'Электрогазосварщик 5р', baseSalary: 1000 },
    { name: 'Юрисконсульт', baseSalary: 1000 },
  ];

  const createdPositions = await Promise.all(
    positions.map(async (position) => {
      const existing = await client.workerPosition.findUnique({ where: { name: position.name } });
      if (!existing) {
        return client.workerPosition.create({ data: position });
      }
      return existing;
    }),
  );

  const clients: CreateWorkClientInput[] = [
    {
      name: 'ООО "НПФ Строитель"',
      address: 'г. Новополоцк',
      contactPhone: '+3752912345678',
    },
    {
      name: 'ООО "ВитГеострой"',
      address: 'г. Новополоцк',
      contactPhone: '+375296220266',
    },
  ];

  const createdClients = await Promise.all(
    clients.map(async (workClient) => {
      const existing = await client.workClient.findUnique({ where: { name: workClient.name } });
      if (!existing) {
        return client.workClient.create({ data: workClient });
      }
      return existing;
    }),
  );

  const workers: CreateWorkerInput[] = [
    {
      firstName: 'Иван',
      middleName: 'Иванович',
      lastName: 'Иванов',
      birthday: new Date(2000, 1, 1),
      hiredDate: new Date(),
      workNorm: 8,
      workerCategoryId: createdCategories[0].id,
      workerPositionId: createdPositions[0].id,
      mobilePhone: '+3752912345678',
    },
    {
      firstName: 'Петр',
      middleName: 'Петрович',
      lastName: 'Петров',
      birthday: new Date(1980, 1, 1),
      hiredDate: new Date(),
      workNorm: 8,
      workerCategoryId: createdCategories[1].id,
      workerPositionId: createdPositions[3].id,
      mobilePhone: '+3752912345678',
    },
  ];

  const createdWorkers = await Promise.all(
    workers.map(async (worker) => {
      const existing = await client.worker.findFirst({
        where: {
          AND: {
            lastName: worker.lastName,
            middleName: worker.middleName,
            firstName: worker.firstName,
          },
        },
      });
      if (!existing) {
        return client.worker.create({ data: worker });
      }
      return existing;
    }),
  );

  const projects: CreateProjectInput[] = [
    {
      summary: 'База',
      startDate: new Date(),
      clientId: createdClients[0].id,
      executorId: createdClients[0].id,
      responsibleWorkerId: createdWorkers[0].id,
    },
    {
      summary: 'Строительство домов',
      startDate: new Date(),
      clientId: createdClients[1].id,
      executorId: createdClients[1].id,
      responsibleWorkerId: createdWorkers[1].id,
    },
  ];

  const createdProjects = await Promise.all(
    projects.map(async (project) => {
      const existing = await client.project.findUnique({ where: { summary: project.summary } });
      if (!existing) {
        return client.project.create({ data: project });
      }
      return existing;
    }),
  );

  const projectTasks: CreateActivityInput[] = [
    {
      projectId: createdProjects[0].id,
      summary: 'Охрана базы'
    },
    {
      projectId: createdProjects[0].id,
      summary: 'Ремонт техники'
    }
  ];


  await Promise.all(
    projectTasks.map(async (activity) => {
      const existing = await client.activity.findUnique({ where: { summary_projectId: {
        projectId: activity.projectId,
        summary: activity.summary
      } } });
      if (!existing) {
        return client.activity.create({ data: activity });
      }
      return existing;
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
