import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

  public async create(createUserDto: CreateUserDto, isAdmin = false): Promise<User> {
    if (await this.usersRepo.findOne({ username: createUserDto.username })) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    if (await this.usersRepo.findOne({ email: createUserDto.email })) {
      throw new HttpException('Email is already exists', HttpStatus.BAD_REQUEST);
    }
    if (isAdmin) {
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, createUserDto.username.length);
    return this.usersRepo.save(this.usersRepo.create(createUserDto));
  }

  public findAll() {
    return this.usersRepo.find();
  }

  public async findOne(id: number) {
    if (!id) {
      return undefined;
    }

    return this.usersRepo.findOne(id);
  }

  public getUserWillRoles(username: string): Promise<User> {
    return this.usersRepo.findOne({ username }, { relations: ['role'] });
  }

  public update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepo.update(id, updateUserDto);
  }

  public remove(id: number) {
    return this.usersRepo.delete(id);
  }
}
