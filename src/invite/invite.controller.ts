import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCustomAuth } from 'src/misc/decorators/api-auth.decorator';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';
import { Invite } from './entities/invite.entity';

@ApiCustomAuth()
@ApiTags('Invite')
@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, Invite))
  public create(@Body() createInviteDto: CreateInviteDto) {
    return this.inviteService.create(createInviteDto);
  }

  @Get()
  public findAll() {
    return this.inviteService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.inviteService.findOne(id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateInviteDto: UpdateInviteDto) {
    return this.inviteService.update(id, updateInviteDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.inviteService.remove(id);
  }
}
