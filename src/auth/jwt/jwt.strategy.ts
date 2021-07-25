import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from '../constants';
import { JwtUserInfo } from './jwt-user-info';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConstants.jwt.secret,
    });
  }

  public async validate(payload: JwtUserInfo): Promise<JwtUserInfo> {
    return payload;
  }
}
