import { Injectable } from '@nestjs/common';
import { Worker } from './entities/worker.entity';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';
import { PrismaService } from 'src/data/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class WorkerService {
  constructor(private readonly _prisma: PrismaService) {}
  public async create(createWorkerInput: CreateWorkerInput): Promise<Worker> {
    const createdWorker = await this._prisma.worker.create({ data: createWorkerInput });
    return plainToClass(Worker, createdWorker);
  }

  public async findAll(filter: any, skip: number, take: number): Promise<Worker[]> {
    const workers = await this._prisma.worker.findMany({
      where: filter,
      skip,
      take,
    });
    return plainToClass(Worker, workers);
  }

  public async findOne(id: number): Promise<Worker> {
    if (!id) {
      return undefined;
    }
    const worker = await this._prisma.worker.findUnique({ where: { id } });
    return plainToClass(Worker, worker);
  }

  public async has(id: number): Promise<boolean> {
    return (await this.findOne(id)) != null;
  }

  public async update(id: number, updateWorkerInput: UpdateWorkerInput): Promise<Worker> {
    const updatedWorker = await this._prisma.worker.update({ where: { id }, data: updateWorkerInput });
    return plainToClass(Worker, updatedWorker);
  }

  public async remove(id: number): Promise<Worker> {
    const removedWorker = await this._prisma.worker.delete({ where: { id } });
    return plainToClass(Worker, removedWorker);
  }
}
