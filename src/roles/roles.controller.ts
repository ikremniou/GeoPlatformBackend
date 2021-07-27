import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCustomAuth } from 'src/utils/decorators/api-auth.decorator';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';
import { Role } from './entities/role.entity';

@ApiCustomAuth()
@ApiTags('Roles')
@Controller('roles')
@UseInterceptors(ClassSerializerInterceptor)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, Role))
  public create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Role))
  public findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Role))
  public findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, Role))
  public update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, Role))
  public remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
