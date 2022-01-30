import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { ServerBusinessError } from 'src/misc/error/server-business.error';
import { I18nService } from 'src/misc/locale/i18n.service';
import { CreateWorkerPositionInput } from './dto/create-worker-position.input';
import { UpdateWorkerPositionInput } from './dto/update-worker-position.input';
import { WorkerPosition } from './entities/worker-position.entity';

@Injectable()
export class WorkerPositionService {
  constructor(private readonly _i18n: I18nService, private readonly _prisma: PrismaService) {}

  public async create(input: CreateWorkerPositionInput): Promise<WorkerPosition> {
    await this.validateUniqueNameUpdate(input.name);

    const position = await this._prisma.workerPosition.create({ data: input });
    return plainToClass(WorkerPosition, position);
  }

  public async findAll(filter?: string, skip?: number, take?: number): Promise<WorkerPosition[]> {
    let where: Prisma.WorkerPositionWhereInput;
    if (filter) {
      where = JSON.parse(filter);
    }

    const positions = await this._prisma.workerPosition.findMany({ where, skip, take });
    return plainToClass(WorkerPosition, positions);
  }

  public async findOne(id: number): Promise<WorkerPosition> {
    const position = await this._prisma.workerPosition.findUnique({ where: { id } });
    return plainToClass(WorkerPosition, position);
  }

  public async update(id: number, update: UpdateWorkerPositionInput) {
    await this.validateId(id);
    if (update.name) {
      await this.validateUniqueNameUpdate(update.name, id);
    }

    const updatedPosition = await this._prisma.workerPosition.update({ where: { id }, data: update });
    return plainToClass(WorkerPosition, updatedPosition);
  }

  public async remove(id: number) {
    await this.validateId(id);
    const removedUser = await this._prisma.workerPosition.delete({ where: { id } });
    return plainToClass(WorkerPosition, removedUser);
  }

  private async validateId(id: number) {
    const position = await this._prisma.workerPosition.findUnique({ where: { id } });
    if (!position) {
      throw new ServerBusinessError(this._i18n.get('WorkerPosition_InvalidId', id));
    }
  }

  private async validateUniqueNameUpdate(name?: string, id?: number) {
    if (!name) {
      return;
    }

    const position = await this._prisma.workerPosition.findUnique({ where: { name } });
    if (position) {
      if (!id) {
        throw new ServerBusinessError(this._i18n.get('WorkerPosition_NameIsNotUnique', name));
      }
      if (position.id !== id) {
        throw new ServerBusinessError(this._i18n.get('WorkerPosition_NameIsNotUnique', name));
      }
    }
  }
}
