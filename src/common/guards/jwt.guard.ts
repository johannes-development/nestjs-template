import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super({});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, _info: any, _context: any, _status?: any) {
    if (err)
      throw new InternalServerErrorException('Error while authenticating user');

    if (!user) throw new UnauthorizedException('Invalid token');

    return user;
  }
}
