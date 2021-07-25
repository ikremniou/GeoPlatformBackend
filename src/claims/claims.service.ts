import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Claim } from './entities/claim.entity';

@Injectable()
export class ClaimsService {
  constructor(@InjectRepository(Claim) private readonly _repository: Repository<Claim>) {}
  public create(createClaimDto: CreateClaimDto): Promise<Claim> {
    const claim = this._repository.create(createClaimDto);
    return this._repository.save(claim);
  }

  public findAll(): Promise<Claim[]> {
    return this._repository.find();
  }

  public findOne(id: number): Promise<Claim> {
    return this._repository.findOne(id);
  }

  public update(id: number, updateClaimDto: UpdateClaimDto): Promise<UpdateResult> {
    return this._repository.update(id, updateClaimDto);
  }

  public remove(id: number): Promise<DeleteResult> {
    return this._repository.delete(id);
  }
}
