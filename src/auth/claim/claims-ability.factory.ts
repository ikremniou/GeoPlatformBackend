import { Ability, AbilityBuilder, AbilityClass, InferSubjects } from '@casl/ability';
import { Claim } from 'src/claims/entities/claim.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/entities/user.entity';
import { JwtUserInfo } from '../jwt/jwt-user-info';

export enum AbilityActions {
  Manage = 'manage',
  Read = 'read',
  Write = 'write',
  Create = 'create',
  Delete = 'delete'
}

type AbilitySubjects = InferSubjects<typeof User | typeof Claim | typeof Role> | 'all';

export type AppAbility = Ability<[AbilityActions, AbilitySubjects]>

export class ClaimsAbilityFactory {

  constructor(private readonly _roleService: RolesService) {
  }

  public async abilityFromUser(userInfo: JwtUserInfo) {
    const builder = new AbilityBuilder<AppAbility>(Ability as AbilityClass<AppAbility>);
    const userRole = await this._roleService.findOne(userInfo.roleId);

    if (userRole.name == 'Admin') {
      builder.can(AbilityActions.Manage, 'all');
      return builder.build();
    }

    // load permissions from database based on the user role
  }
}
