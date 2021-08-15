import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicPath } from 'src/misc/decorators/public-path.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';
import { RequestWithUser } from './request-with-user';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicPath()
  @Post('local')
  @UseGuards(LocalAuthGuard)
  public authLocal(@Request() request: RequestWithUser) {
    return this.authService.login(request.user);
  }
}
