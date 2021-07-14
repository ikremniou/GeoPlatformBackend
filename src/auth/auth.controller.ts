import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';
import { RequestWithUser } from './request-with-user';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local')
  @UseGuards(LocalAuthGuard)
  public authLocal(@Request() request: RequestWithUser) {
    return this.authService.login(request.user);
  }
}
