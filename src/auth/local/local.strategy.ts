import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { I18nService } from 'src/misc/locale/i18n.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _i18n: I18nService, private readonly _authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<any> {
    const user = await this._authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException({
        message: this._i18n.get('Auth_InvalidNameOrPassword')
      });
    }
    return user;
  }
}
