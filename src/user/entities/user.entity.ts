import { Exclude } from 'class-transformer';
import { User as UserPrisma, Role } from '@prisma/client';

export class User implements UserPrisma {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  role: Role;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
