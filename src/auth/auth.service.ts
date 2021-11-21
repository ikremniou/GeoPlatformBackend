import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserAbilityFactory } from './policy/user-ability.factory';

@Injectable()
export class AuthService {
    constructor(
        private readonly _jwtService: JwtService,
        private readonly _abilityFactory: UserAbilityFactory,
        private readonly _userService: UsersService) {
    }

    public async validate(username: string, passwd: string): Promise<User> {
        const user = await this._userService.getUserWithRoles(username);
        if (user) {
            if (await bcrypt.compare(passwd, user.password)) {
                return user;
            }
        }
        return undefined;
    }

    public async login(user: User) {
        const payload = { username: user.username, userId: user.id, roleId: user.role?.id };
        return {
            token_type: 'bearer',
            access_token: this._jwtService.sign(payload),
            claims: await this._abilityFactory.getUserAbilities(user)
        }
    }
}
