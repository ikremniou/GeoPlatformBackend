import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { ServerBusinessError } from 'src/misc/error/server-business.error';
import { I18nService } from 'src/misc/locale/i18n.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { Invite } from './entities/invite.entity';

@Injectable()
export class InviteService {
  constructor(private readonly _i18n: I18nService, private readonly _prisma: PrismaService) {}

  public async create(createInviteDto: CreateInviteDto): Promise<Invite> {
    await this.validateSingleInvite(createInviteDto.workerId);
    await this.validateAlreadyRegistered(createInviteDto.workerId);
    const createdInvite = await this._prisma.invite.create({ data: createInviteDto });
    return plainToClass(Invite, createdInvite);
  }

  public async findAll(): Promise<Invite[]> {
    const invitations = await this._prisma.invite.findMany({ include: { worker: true } });
    return plainToClass(Invite, invitations);
  }

  public async findOne(id: string): Promise<Invite> {
    const invitation = await this._prisma.invite.findUnique({ where: { id }, include: { worker: true } });
    return plainToClass(Invite, invitation);
  }

  public async update(id: string, updateInviteDto: UpdateInviteDto): Promise<Invite> {
    await this.validateSingleInvite(updateInviteDto.workerId);
    await this.validateAlreadyRegistered(updateInviteDto.workerId);
    const updatedInvite = await this._prisma.invite.update({ where: { id }, data: updateInviteDto });
    return plainToClass(Invite, updatedInvite);
  }

  public async remove(id: string): Promise<Invite> {
    const removedInvite = await this._prisma.invite.delete({ where: { id } });
    return plainToClass(Invite, removedInvite);
  }

  private async validateSingleInvite(workerId: number) {
    if (!workerId) {
      throw new ServerBusinessError(this._i18n.get('Invite_WorkerIdRequired'));
    }

    const worker = await this._prisma.worker.findUnique({
      where: { id: workerId },
      include: { invitation: true },
    });
    if (worker.invitation) {
      throw new ServerBusinessError(this._i18n.get('Invite_CannotAddMoreThenOneForWorker'));
    }
  }

  private async validateAlreadyRegistered(workerId: number): Promise<void> {
    const worker = await this._prisma.user.findUnique({ where: { workerId } });
    if (worker) {
      throw new ServerBusinessError(this._i18n.get('Invite_CannotAddForWorkerWithAccount'));
    }
  }
}
