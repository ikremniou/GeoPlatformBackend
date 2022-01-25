import { HttpException, HttpStatus } from '@nestjs/common';

export class JwtUnauthorizedError extends HttpException {
  constructor() {
    super({ jwt: true }, HttpStatus.FORBIDDEN);
  }
}
