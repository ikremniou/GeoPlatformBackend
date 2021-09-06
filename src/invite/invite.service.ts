import { Injectable } from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { Invite } from './entities/invite.entity';

@Injectable()
export class InviteService {
  public async create(createInviteDto: CreateInviteDto): Promise<Invite> {
    // const worker = await this._workerRepository.findOne(createInviteDto.workerId);
    // if (!worker) {
    //     throw new HttpException('Cannot create invitation for this worker. Worker does not exist',HttpStatus.BAD_REQUEST );
    // }

    // const inviteToCreate: Partial<Invite> = { worker: worker }
    // this._inviteRepository.create(inviteToCreate);
    // return this._inviteRepository.save(inviteToCreate);
    throw "";
  }

  public findAll(): Promise<Invite> {
    throw `This action returns all invite`;
  }

  public findOne(id: number): Promise<Invite[]> {
    throw `This action returns a #${id} invite`;
  }

  public update(id: number, updateInviteDto: UpdateInviteDto): Promise<Invite> {
    throw `This action updates a #${id} invite`;
  }

  public remove(id: number): Promise<Invite > {
    throw `This action removes a #${id} invite`;
  }
}
