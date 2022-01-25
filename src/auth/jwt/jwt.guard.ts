import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IsPublicRouteKey } from 'src/misc/decorators/public-path.decorator';
import { ContextResolver } from '../context-resolver';
import { JwtUnauthorizedError } from './jwt-forbidden.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly _reflector: Reflector) {
    super();
  }

  public async canActivate(context: ExecutionContext) {
    const isPublic = this._reflector.getAllAndOverride(IsPublicRouteKey, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    try {
      const result = await super.canActivate(context);
      return result as boolean;
    } catch(error) {
      if (error instanceof UnauthorizedException) {
        throw new JwtUnauthorizedError();
      }
      throw error;
    }
  }

  public getRequest(context: ExecutionContext) {
    return ContextResolver.getRequest(context);
  }
}
