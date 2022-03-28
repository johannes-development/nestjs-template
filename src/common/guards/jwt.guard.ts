import {
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtGuard.name);
  constructor() {
    super({});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, _info: any, _context: any, _status?: any) {
    if (err) {
      console.trace(err);
      this.logger.error(err);
      throw new InternalServerErrorException('Error while authenticating user');
    }

    if (!user) throw new UnauthorizedException('Invalid token');

    return user;
  }
}
