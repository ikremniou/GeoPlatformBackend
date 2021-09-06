import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/data/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(createRoleDto: CreateRoleDto): Promise<Role> {
    if (await this._prisma.role.findUnique({ where: { name: createRoleDto.name } })) {
      throw new HttpException('Role with the specified name is already exists', HttpStatus.BAD_REQUEST);
    }

    const users = createRoleDto.users.map((userId) => {
      return { id: userId };
    });

    const claims = createRoleDto.claims.map((claimId) => {
      return { id: claimId };
    });

    return this._prisma.role.create({
      data: {
        name: createRoleDto.name,
        users: {
          connect: users,
        },
        claims: {
          connect: claims,
        },
      },
    });
  }

  public findAll(): Promise<Role[]> {
    return this._prisma.role.findMany();
  }

  public async findOne(id: number): Promise<Role> {
    if (!id) {
      return undefined;
    }

    return this._prisma.role.findUnique({ where: { id } });
  }

  public async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const roleToUpdate: Partial<Role> = {};
    if (updateRoleDto.name) {
      roleToUpdate.name = updateRoleDto.name;
    }
    const users = updateRoleDto.users.map((userId) => {
      return { id: userId };
    });

    const claims = updateRoleDto.claims.map((claimId) => {
      return { id: claimId };
    });

    return this._prisma.role.update({ where: {id}, data: {
      name: updateRoleDto.name,
      claims: {
        connect: claims
      },
      users: {
        connect: users
      }
    }});
  }

  public remove(id: number): Promise<Role> {
    return this._prisma.role.delete({where: { id }});
  }
}
