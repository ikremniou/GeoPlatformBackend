import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Claim } from './entities/claim.entity';

@Injectable()
export class ClaimsService {
  constructor(private readonly _prismaClient: PrismaService) {}
  public async create(createClaimDto: CreateClaimDto): Promise<Claim> {
    const createdClaim = await this._prismaClient.claim.create({ data: createClaimDto });
    return plainToClass(Claim, createdClaim);
  }

  public async findAll(): Promise<Claim[]> {
     const allClaims = await this._prismaClient.claim.findMany();
     return plainToClass(Claim, allClaims);
  }

  public async findOne(id: number): Promise<Claim> {
    if (!id) {
      return undefined;
    }

    const claim = await this._prismaClient.claim.findUnique({ where: { id } });
    return plainToClass(Claim, claim);
  }

  public async update(id: number, updateClaimDto: UpdateClaimDto): Promise<Claim> {
    const updatedClaim = await this._prismaClient.claim.update({ where: { id }, data: updateClaimDto });
    return plainToClass(Claim, updatedClaim);
  }

  public async remove(id: number): Promise<Claim> {
    const removedClaim = await this._prismaClient.claim.delete({ where: { id } });
    return plainToClass(Claim, removedClaim);
  }
}
