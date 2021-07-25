import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtUserInfo } from '../jwt/jwt-user-info';
import { ClaimsAbilityFactory } from './claims-ability.factory';

@Injectable()
export class UserPolicyGuard implements CanActivate {
  constructor(private readonly _abilityFactory: ClaimsAbilityFactory) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user: JwtUserInfo = context.switchToHttp().getRequest().user;
    const ability = this._abilityFactory.abilityFromUser(user);

    return true;
  }
}
