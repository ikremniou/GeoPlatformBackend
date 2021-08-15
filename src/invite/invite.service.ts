import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { Invite } from './entities/invite.entity';

@Injectable()
export class InviteService {
  constructor(
      // @InjectRepository(Worker) private readonly _workerRepository: Repository<Worker>,
      @InjectRepository(Invite) private readonly _inviteRepository: Repository<Invite>
      ){}

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

  public remove(id: number): Promise<DeleteResult> {
    throw `This action removes a #${id} invite`;
  }
}
