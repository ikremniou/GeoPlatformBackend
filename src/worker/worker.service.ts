import { Injectable } from '@nestjs/common';
import { Worker } from './entities/worker.entity';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';
import { PrismaService } from 'src/data/prisma.service';

@Injectable()
export class WorkerService {
  constructor(private readonly _workersRepository: PrismaService) {}
  public async create(createWorkerInput: CreateWorkerInput): Promise<Worker> {
    return this._workersRepository.worker.create({ data: createWorkerInput });
  }

  public async findAll(): Promise<Worker[]> {
    return this._workersRepository.worker.findMany();
  }

  public async findOne(id: number): Promise<Worker> {
    if (!id) {
      return undefined;
    }
    return this._workersRepository.worker.findUnique({where: { id }});
  }

  public async update(id: number, updateWorkerInput: UpdateWorkerInput): Promise<Worker> {
    return this._workersRepository.worker.update({ where: { id }, data: updateWorkerInput});
  }

  public async remove(id: number): Promise<Worker> {
    return this._workersRepository.worker.delete({ where: { id }});
  }
}
