import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly _repository: Repository<Role>) {}

  public async create(createRoleDto: CreateRoleDto): Promise<Role> {
    if (await this._repository.findOne({ name: createRoleDto.name })) {
      throw new HttpException('Role with the specified name is already exists', HttpStatus.BAD_REQUEST);
    }

    const role = this._repository.create(createRoleDto);
    return this._repository.save(role);
  }

  public findAll(): Promise<Role[]> {
    return this._repository.find();
  }

  public findOne(id: number): Promise<Role> {
    return this._repository.findOne(id);
  }

  public update(id: number, updateRoleDto: UpdateRoleDto): Promise<UpdateResult> {
    return this._repository.update(id, updateRoleDto);
  }

  public remove(id: number): Promise<DeleteResult> {
    return this._repository.delete(id);
  }
}
