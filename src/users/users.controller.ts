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
import { ApiTags } from '@nestjs/swagger';
import { ApiCustomAuth } from 'src/misc/decorators/api-auth.decorator';
import { UseGuards } from '@nestjs/common';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';

@ApiTags('User')
@ApiCustomAuth()
@Controller('api/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, User))
  public create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, User))
  public findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, User))
  public findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, User))
  public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, User))
  public remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}
