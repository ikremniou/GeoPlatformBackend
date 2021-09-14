import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { Invite } from './entities/invite.entity';

@Injectable()
export class InviteService {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(createInviteDto: CreateInviteDto): Promise<Invite> {
    await this.validateSingleInvite(createInviteDto.workerId);
    const createdInvite = await this._prisma.invite.create({ data: createInviteDto });
    return plainToClass(Invite, createdInvite);
  }

  public async findAll(): Promise<Invite[]> {
    const invitations = await this._prisma.invite.findMany();
    return plainToClass(Invite, invitations);
  }

  public async findOne(id: string): Promise<Invite> {
    const invitation = await this._prisma.invite.findUnique({ where: { id } });
    return plainToClass(Invite, invitation);
  }

  public async update(id: string, updateInviteDto: UpdateInviteDto): Promise<Invite> {
    await this.validateSingleInvite(updateInviteDto.workerId);
    const updatedInvite = await this._prisma.invite.update({ where: { id }, data: updateInviteDto });
    return plainToClass(Invite, updatedInvite);
  }

  public async remove(id: string): Promise<Invite> {
    const removedInvite = await this._prisma.invite.delete({ where: { id } });
    return plainToClass(Invite, removedInvite);
  }

  private async validateSingleInvite(workerId: number) {
    if (!workerId) {
      throw new HttpException('The worker ID is required to created/update Invitation', HttpStatus.BAD_REQUEST);
    }

    const worker = await this._prisma.worker.findUnique({
      where: { id: workerId },
      include: { invitation: true },
    });
    if (worker.invitation) {
      throw new HttpException('The user already has invitation created', HttpStatus.BAD_REQUEST);
    }
  }
}
