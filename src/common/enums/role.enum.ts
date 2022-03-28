import { Role as IRole } from '@prisma/client';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

for (const key in Role) {
  if (IRole[key] !== Role[key]) {
    throw new Error(`${key} is not equal`);
  }
}
