import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from "../constants";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: authConstants.jwt.secret
        });
    }

    public async validate(payload: any) {
        return { userId: payload.userId, username: payload.username };
    }
}