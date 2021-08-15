import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Claim } from 'src/claims/entities/claim.entity';
import { Invite } from 'src/invite/entities/invite.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/entities/user.entity';
import { JwtUserInfo } from '../jwt/jwt-user-info';

export enum AbilityActions {
  Manage = 'manage',
  Read = 'read',
  Update = 'update',
  Create = 'create',
  Delete = 'delete',
}

type AbilitySubjects = InferSubjects<typeof User | typeof Claim | typeof Role | typeof Invite> | 'all';

export type AppAbility = Ability<[AbilityActions, AbilitySubjects]>;

@Injectable()
export class UserAbilityFactory {
  constructor(private readonly _roleService: RolesService) {}

  public async abilityFromUser(userInfo: JwtUserInfo): Promise<AppAbility> {
    const builder = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
    const userRole = await this._roleService.findOne(userInfo.roleId);

    if (userRole) {
      if (userRole.name == 'Admin') {
        builder.can(AbilityActions.Manage, 'all');
        return this.buildAbility(builder);
      }
      // load permissions from database based on the user role
    }

    // set default permissions???
    return this.buildAbility(builder);
  }

  public buildAbility(builder: AbilityBuilder<AppAbility>): AppAbility {
    return builder.build({ detectSubjectType: (type) => type.constructor as ExtractSubjectType<AbilitySubjects> });
  }
}
