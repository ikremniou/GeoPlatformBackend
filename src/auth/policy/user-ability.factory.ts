import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Activity } from 'src/activity/entities/activity.entity';
import { Claim } from 'src/claims/entities/claim.entity';
import { Invite } from 'src/invite/entities/invite.entity';
import { Project } from 'src/project/entities/project.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { Worker } from 'src/worker/entities/worker.entity';
import { User } from 'src/users/entities/user.entity';
import { WorkerCategory } from 'src/worker-category/entities/worker-category.entity';
import { WorkerPosition } from 'src/worker-position/entities/worker-position.entity';
import { WorkClient } from 'src/client/entities/work-client.entity';

export enum AbilityActions {
  Manage = 'manage',
  Read = 'read',
  Update = 'update',
  Create = 'create',
  Delete = 'delete',
}

type AbilitySubjects =
  | InferSubjects<
      | typeof User
      | typeof Claim
      | typeof Role
      | typeof Invite
      | typeof Activity
      | typeof Project
      | typeof Worker
      | typeof WorkerCategory
      | typeof WorkerPosition
      | typeof WorkClient
    >
  | 'all';

export type AppAbility = Ability<[AbilityActions, AbilitySubjects]>;

@Injectable()
export class UserAbilityFactory {
  constructor(private readonly _roleService: RolesService) {}

  public async abilityFromRoleId(userRoleId: number): Promise<AppAbility> {
    const builder = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
    const userRole = await this._roleService.findOne(userRoleId);

    if (userRole) {
      if (userRole.name == 'Admin') {
        builder.can(AbilityActions.Manage, 'all');
        return this.buildAbility(builder);
      }

      for (const platformClaim of userRole.claims) {
        builder.can(
          platformClaim.action as AbilityActions,
          platformClaim.subject as ExtractSubjectType<AbilitySubjects>,
        );
      }
    }

    // set default permissions???
    return this.buildAbility(builder);
  }

  public async getUserAbilities(user: User): Promise<Partial<Claim>[]> {
    if (!user.role) {
      return [];
    }

    if (user.role.name === 'Admin') {
      return [
        {
          action: AbilityActions.Manage,
          subject: 'all',
        },
      ];
    }

    const userRoleWithClaims = await this._roleService.findOne(user.role.id);
    return userRoleWithClaims.claims;
  }

  public buildAbility(builder: AbilityBuilder<AppAbility>): AppAbility {
    return builder.build({ detectSubjectType: (type) => type.constructor as ExtractSubjectType<AbilitySubjects> });
  }
}
