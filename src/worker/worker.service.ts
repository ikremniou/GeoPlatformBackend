import { Injectable } from '@nestjs/common';
import { Worker } from './entities/worker.entity';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';
import { PrismaService } from 'src/data/prisma.service';
import { plainToClass } from 'class-transformer';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkerService {
  constructor(private readonly _workersRepository: PrismaService) {}
  public async create(createWorkerInput: CreateWorkerInput): Promise<Worker> {
    const createdWorker = await this._workersRepository.worker.create({ data: createWorkerInput });
    return plainToClass(Worker, createdWorker);
  }

  public async findAll(filter: string, skip: number, take: number): Promise<Worker[]> {
    let whereFilter: Prisma.WorkerWhereInput;
    if (filter) {
      whereFilter = JSON.parse(filter);
    }

    const workers = await this._workersRepository.worker.findMany({
      where: whereFilter,
      skip,
      take,
    });
    return plainToClass(Worker, workers);
  }

  public async findOne(id: number): Promise<Worker> {
    if (!id) {
      return undefined;
    }
    const worker = await this._workersRepository.worker.findUnique({ where: { id } });
    return plainToClass(Worker, worker);
  }

  public async update(id: number, updateWorkerInput: UpdateWorkerInput): Promise<Worker> {
    const updatedWorker = await this._workersRepository.worker.update({ where: { id }, data: updateWorkerInput });
    return plainToClass(Worker, updatedWorker);
  }

  public async remove(id: number): Promise<Worker> {
    const removedWorker = await this._workersRepository.worker.delete({ where: { id } });
    return plainToClass(Worker, removedWorker);
  }
}
