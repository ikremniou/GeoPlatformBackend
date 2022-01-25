import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ContextResolver } from '../context-resolver';
import { JwtUserInfo } from '../jwt/jwt-user-info';
import { UserAbilityFactory } from './user-ability.factory';
import { UserPolicyHandler, UserPolicyMetadataKey } from './user-policy.decorator';

@Injectable()
export class UserPolicyGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector, private readonly _abilityFactory: UserAbilityFactory) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const userPolicies = this._reflector.get<UserPolicyHandler[]>(UserPolicyMetadataKey, context.getHandler());

    if (userPolicies) {
      const user: JwtUserInfo = ContextResolver.getRequest(context).user;
      if (!user) {
        return false;
      }

      const ability = await this._abilityFactory.abilityFromRoleId(user.roleId);
      return userPolicies.every((policy) => policy(ability));
    }
    return true;
  }
}
