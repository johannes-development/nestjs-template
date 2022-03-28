import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO, FindUserDTO } from './dto';
import { User } from './entities';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  /**
   * It creates a new instance of the PrismaService class and passes it to the constructor
   * @param {PrismaService} prisma - PrismaService - the PrismaService class is provided by the
   * prisma-binding library.
   */
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new user
   * @param {CreateUserDTO} createUserDTO - CreateUserDTO
   * @returns A User Entity
   */
  async create(createUserDTO: CreateUserDTO) {
    // Create a new user in the database
    const user = await this.prisma.user.create({
      data: {
        ...createUserDTO,
      },
    });

    // Create a new user entity from the user we just created for serialization
    return new User(user);
  }

  /**
   * Find a user by their email
   * @param {FindUserDTO} findUserDTO - FindUserDTO
   * @returns A User Entity
   */
  async findOne(findUserDTO: FindUserDTO) {
    // Find a user by their email in the database
    const user = await this.prisma.user.findUnique({
      where: findUserDTO.where,
    });

    // Create a new user entity from the user we just found for serialization
    return new User(user);
  }
}
