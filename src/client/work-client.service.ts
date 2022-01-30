import { Injectable } from '@nestjs/common';
import { TransformPlainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { ServerBusinessError } from 'src/misc/error/server-business.error';
import { I18nService } from 'src/misc/locale/i18n.service';
import { CreateWorkClientInput } from './dto/create-work-client.input';
import { UpdateWorkClientInput } from './dto/update-work-client.input';
import { WorkClient } from './entities/work-client.entity';

@Injectable()
export class WorkClientService {
  constructor(private readonly _i18n: I18nService, private readonly _prisma: PrismaService) {}

  @TransformPlainToClass(WorkClient)
  public async create(createClientInput: CreateWorkClientInput): Promise<WorkClient> {
    await this.validateUniqueName(createClientInput.name);
    return this._prisma.workClient.create({ data: createClientInput });
  }

  @TransformPlainToClass(WorkClient)
  public findAll(filter: any, skip: number, take: number) {
    return this._prisma.workClient.findMany({ where: filter, skip, take });
  }

  @TransformPlainToClass(WorkClient)
  public async findOne(id: number) {
    await this.validateId(id);
    return this._prisma.workClient.findUnique({where: { id }});
  }

  @TransformPlainToClass(WorkClient)
  public async update(id: number, updateClientInput: UpdateWorkClientInput) {
    await Promise.all([this.validateId(id), this.validateUniqueName(updateClientInput.name, id)]);
    return this._prisma.workClient.update({ where: { id }, data: updateClientInput });
  }

  @TransformPlainToClass(WorkClient)
  public async remove(id: number): Promise<WorkClient> {
    await this.validateId(id);
    return this._prisma.workClient.delete({ where: { id }});
  }

  private async validateId(id: number): Promise<void> {
    if (!id || !await this._prisma.workClient.findUnique({ where: { id }})) {
      throw new ServerBusinessError(this._i18n.get('Client_InvalidId', id));
    }
  }

  private async validateUniqueName(name?: string, id?: number): Promise<void> {
    if (!name) {
      return;
    }

    const workClient = await this._prisma.workClient.findUnique({ where: { name } });
    if (workClient) {
      if (!id) {
        throw new ServerBusinessError(this._i18n.get('Client_NameIsNotUnique', name));
      }
      if (workClient.id !== id) {
        throw new ServerBusinessError(this._i18n.get('Client_NameIsNotUnique', name));
      }
    }
  }
}
