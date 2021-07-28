import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim } from 'src/claims/entities/claim.entity';
import { User } from 'src/users/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    @InjectRepository(Role) private readonly _roleRepository: Repository<Role>,
    @InjectRepository(Claim) private readonly _claimRepository: Repository<Claim>,
  ) {}

  public async create(createRoleDto: CreateRoleDto): Promise<Role> {
    if (await this._roleRepository.findOne({ name: createRoleDto.name })) {
      throw new HttpException('Role with the specified name is already exists', HttpStatus.BAD_REQUEST);
    }

    let users: User[];
    if (createRoleDto.users) {
      users = await this._userRepository.findByIds(createRoleDto.users);
    }
    let claims: Claim[];
    if (createRoleDto.claims) {
      claims = await this._claimRepository.findByIds(createRoleDto.claims);
    }

    const roleToCreate: Partial<Role> = { name: createRoleDto.name, users, claims };
    const role = this._roleRepository.create(roleToCreate);
    return this._roleRepository.save(role);
  }

  public findAll(): Promise<Role[]> {
    return this._roleRepository.find();
  }

  public async findOne(id: number): Promise<Role> {
    if (!id) {
      return undefined;
    }

    return this._roleRepository.findOne(id);
  }

  public async update(id: number, updateRoleDto: UpdateRoleDto): Promise<UpdateResult> {
    const roleToUpdate: Partial<Role> = {};
    if (updateRoleDto.name) {
      roleToUpdate.name = updateRoleDto.name;
    }
    if (updateRoleDto.users) {
      const users = await this._userRepository.findByIds(updateRoleDto.users);
      roleToUpdate.users = users;
    }
    if (updateRoleDto.claims) {
      const claims = await this._claimRepository.findByIds(updateRoleDto.claims);
      roleToUpdate.claims = claims;
    }
    return this._roleRepository.update(id, roleToUpdate);
  }

  public remove(id: number): Promise<DeleteResult> {
    return this._roleRepository.delete(id);
  }
}
