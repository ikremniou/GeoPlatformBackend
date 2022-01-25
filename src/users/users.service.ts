import { Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { ServerBusinessError } from 'src/misc/error/server-business.error';
import { I18nService } from 'src/misc/locale/i18n.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly _i18nService: I18nService, private readonly _prismaClient: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this._prismaClient.user.findUnique({ where: { username: createUserDto.username } })) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    if (await this._prismaClient.user.findUnique({ where: { email: createUserDto.email } })) {
      throw new HttpException('Email is already exists', HttpStatus.BAD_REQUEST);
    }

    const invitation = await this._prismaClient.invite.findUnique({
      where: { id: createUserDto.registerToken },
    });
    if (!invitation) {
      throw new ServerBusinessError(this._i18nService.get('User_InvalidInvitation'));
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, createUserDto.username.length);

    const userInput: Prisma.UserCreateInput = {
      email: createUserDto.email,
      password: createUserDto.password,
      username: createUserDto.username,
      status: 'active',
      worker: {
        connect: {
          id: invitation.workerId,
        },
      },
    };

    const createdUser = await this._prismaClient.user.create({ data: userInput });
    await this._prismaClient.invite.delete({ where: { id: invitation.id } });
    return plainToClass(User, createdUser);
  }

  public async findAll(): Promise<User[]> {
    const users = await this._prismaClient.user.findMany();
    return plainToClass(User, users);
  }

  public async findOne(id: number): Promise<User> {
    if (!id) {
      return undefined;
    }

    const user = await this._prismaClient.user.findUnique({ where: { id } });
    return plainToClass(User, user);
  }

  public async getUserWithRoles(username: string): Promise<User> {
    const user = await this._prismaClient.user.findUnique({ where: { username }, include: { role: true } });
    return plainToClass(User, user);
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this._prismaClient.user.update({ where: { id }, data: updateUserDto });
    return plainToClass(User, updatedUser);
  }

  public async remove(id: number): Promise<User> {
    const deletedUser = await this._prismaClient.user.delete({ where: { id } });
    return plainToClass(User, deletedUser);
  }
}
