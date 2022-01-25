import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { ServerBusinessError } from 'src/misc/error/server-business.error';
import { I18nService } from 'src/misc/locale/i18n.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly _i18nService: I18nService, private readonly _prisma: PrismaService) {}

  public async create(createRoleDto: CreateRoleDto): Promise<Role> {
    await this.validateUniqueName(createRoleDto.name);

    const claims = createRoleDto.claims.map((claimId) => {
      return { id: claimId };
    });

    const createdRole = await this._prisma.role.create({
      data: {
        name: createRoleDto.name,
        claims: {
          connect: claims,
        },
      },
      include: { claims: true },
    });

    return plainToClass(Role, createdRole);
  }

  public async findAll(): Promise<Role[]> {
    const allRoles = await this._prisma.role.findMany({ include: { claims: true } });
    const classRoles = plainToClass(Role, allRoles);
    return classRoles;
  }

  public async findOne(id: number): Promise<Role> {
    if (!id) {
      return undefined;
    }

    const role = await this._prisma.role.findUnique({ where: { id }, include: { claims: true } });
    return plainToClass(Role, role);
  }

  public async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const currentRole = await this._prisma.role.findUnique({ where: { id }, include: { claims: true } });
    if (!currentRole) {
      throw new ServerBusinessError(this._i18nService.get('Role_CannotFindEntityById', id));
    }

    if (updateRoleDto.name && currentRole.name !== updateRoleDto.name) {
      await this.validateUniqueName(updateRoleDto.name);
    }

    const oldClaims = currentRole.claims.map((claim) => {
      return { id: claim.id };
    });

    const claims = updateRoleDto.claims.map((claimId) => {
      return { id: claimId };
    });

    const updatedRole = await this._prisma.role.update({
      where: { id },
      data: {
        name: updateRoleDto.name,
        claims: {
          disconnect: oldClaims,
          connect: claims,
        },
      },
      include: { claims: true },
    });

    return plainToClass(Role, updatedRole);
  }

  public async remove(id: number): Promise<Role> {
    const removedRole = await this._prisma.role.delete({ where: { id } });
    return plainToClass(Role, removedRole);
  }

  private async validateUniqueName(name: string) {
    if (await this._prisma.role.findUnique({ where: { name } })) {
      throw new ServerBusinessError(this._i18nService.get('Role_NameIsNotUnique', name));
    }
  }
}
