import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/data/prisma.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Claim } from './entities/claim.entity';

@Injectable()
export class ClaimsService {
  constructor(private readonly _prismaClient: PrismaService) {}
  public create(createClaimDto: CreateClaimDto): Promise<Claim> {
    const claim = this._prismaClient.claim.create({ data: createClaimDto });
    return claim;
  }

  public findAll(): Promise<Claim[]> {
    return this._prismaClient.claim.findMany();
  }

  public findOne(id: number): Promise<Claim> {
    if (!id) {
      return undefined;
    }

    return this._prismaClient.claim.findUnique({ where: { id } });
  }

  public update(id: number, updateClaimDto: UpdateClaimDto): Promise<Claim> {
    return this._prismaClient.claim.update({ where: { id }, data: updateClaimDto });
  }

  public remove(id: number): Promise<Claim> {
    return this._prismaClient.claim.delete({ where: { id } });
  }
}
