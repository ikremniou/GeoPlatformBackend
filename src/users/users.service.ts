import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { classToClass, plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly _prismaClient: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this._prismaClient.user.findUnique({ where: { username: createUserDto.username } })) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    if (await this._prismaClient.user.findUnique({ where: { email: createUserDto.email } })) {
      throw new HttpException('Email is already exists', HttpStatus.BAD_REQUEST);
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, createUserDto.username.length);
    return this._prismaClient.user.create({ data: createUserDto });
  }

  public async findAll(): Promise<User[]> {
    const users = await this._prismaClient.user.findMany();
    return plainToClass(User, users);
  }

  public async findOne(id: number): Promise<User> {
    if (!id) {
      return undefined;
    }

    return this._prismaClient.user.findUnique({ where: { id } });
  }

  public getUserWillRoles(username: string): Promise<User> {
    return this._prismaClient.user.findUnique({ where: { username }, include: { role: true } });
  }

  public update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this._prismaClient.user.update({ where: { id }, data: updateUserDto });
  }

  public remove(id: number): Promise<User> {
    return this._prismaClient.user.delete({ where: { id } });
  }
}
