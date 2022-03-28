import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import * as argon2 from 'argon2';

import { AuthSignInDTO, AuthSignUpDTO } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private jwtSecret: string;

  /**
   * It creates a new instance of the AuthService class.
   * @param {ConfigService} configService - ConfigService - This is the config service that we created
   * earlier.
   * @param {JwtService} jwtService - The JwtService class.
   * @param {UserService} userService - The user service is used to find a user by their email.
   */
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.jwtSecret = configService.get('JWT_SECRET');
  }

  /**
   * It signs in a user and returns a token.
   * @param {AuthSignInDTO} authSignInDTO - The DTO that contains the user's email and password.
   * @returns The token
   */
  async signIn(authSignInDTO: AuthSignInDTO) {
    // TODO: Implement the logic to validate the user sign-in credentials
    try {
      // Check if the user exists in the database by fetching the user by email
      const user = await this.userService.findOne({
        where: { email: authSignInDTO.email },
      });

      // If the user does not exist, throw an 403 error (Forbidden)
      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }

      // Check if the password is correct
      const isPasswordCorrect = await argon2.verify(
        user.password,
        authSignInDTO.password,
      );

      // If the password is not correct throw a 403 error (Forbidden)
      if (!isPasswordCorrect) {
        throw new ForbiddenException('Invalid credentials');
      }

      // Sign the token
      return await this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;

      // If there is an unknown error, throw a 500 error (Internal Server Error)
      // and log the error
      this.logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  /**
   * If the user exists, throw a 403 error. If the user does not exist, create the user and sign the
   * token
   * @param {AuthSignOutDTO} authSignUpDTO - The DTO that contains the user's email and password.
   * @returns The sign-up function returns a token.
   */
  async signUp(authSignUpDTO: AuthSignUpDTO) {
    // TODO: Implement the logic to validate the user sign-up credentials
    try {
      // Check if the user exists in the database by fetching the user by email
      const user = await this.userService.findOne({
        where: { email: authSignUpDTO.email },
      });

      // If the user does exist, throw an 403 error (Forbidden)
      if (user) {
        throw new ForbiddenException('Email already in use');
      }

      // Hash the password before saving the user
      const hashedPassword = await argon2.hash(authSignUpDTO.password);

      // Create the user
      const newUser = await this.userService.create({
        ...authSignUpDTO,
        password: hashedPassword,
      });

      // Sign the token
      return await this.signToken(newUser.id, newUser.email);
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;

      // If there is an unknown error, throw a 500 error (Internal Server Error)
      // and log the error
      this.logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  /**
   * It generates a new JWT token and returns it
   * @param {string} userId - The userId of the user that is requesting a token.
   * @param {string} email - The email of the user.
   * @returns An object with an access_token property.
   */
  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    // TODO: Implement the logic to generate a new JWT

    // Check if the jwt payload data is valid
    if (!userId || !email) {
      this.logger.error(
        `Invalid payload data: userId: ${userId}, email: ${email}`,
      );
      throw new Error('Invalid jwt payload data');
    }

    // Create the payload
    const payload = {
      sub: userId,
      email,
    };

    // Signing the token.
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: this.jwtSecret,
    });

    // Return the token
    return {
      access_token,
    };
  }
}
