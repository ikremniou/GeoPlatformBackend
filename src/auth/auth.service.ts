import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService) {
    }

    public async validate(username: string, passwd: string): Promise<User> {
        const user = await this.userService.findByUsername(username);
        if (user) {
            if (await bcrypt.compare(passwd, user.password)) {
                return user;
            }
        }
        return undefined;
    }

    public async login(user: User) {
        const payload = { username: user.username, userId: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
