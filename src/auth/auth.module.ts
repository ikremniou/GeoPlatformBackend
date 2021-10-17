import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LocaleModule } from 'src/misc/locale/locale.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authConstants } from './constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';

@Module({
  imports: [UsersModule, RolesModule, JwtModule.register(authConstants.jwt), LocaleModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
