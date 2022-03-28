import { ForbiddenException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from 'src/common/strategies';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { AuthSignInDTO, AuthSignUpDTO } from './dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({}), JwtModule.register({}), UserModule],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  const user: AuthSignUpDTO = {
    email: 'jo@mail.com',
    password: '123456',
    firstName: 'Jo',
    lastName: 'Smith',
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign-up new user', async () => {
    expect(await service.signUp(user)).toHaveProperty(['access_token']);
  });

  it('should throw email unavailable', async () => {
    expect(async () => {
      await service.signUp(user);
    }).rejects.toThrow(ForbiddenException);
  });

  // it('should sign-in new user', async () => {
  //   expect(await service.signIn(user)).toHaveProperty(['access_token']);
  // });
});
