import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  public create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post('init')
  public initialize() {
    return this.usersService.create({
      email: 'cvobodne@yandex.ru',
      username: 'Ilya_Kremniou',
      registerToken: 'adminToken',
      password: 'passwd',
    });
  }

  @Get()
  public findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.remove(+id);
  }
}
