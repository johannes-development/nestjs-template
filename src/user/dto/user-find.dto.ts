import { Prisma } from '@prisma/client';

export class FindUserDTO implements Prisma.UserFindUniqueArgs {
  where: Prisma.UserWhereUniqueInput;
}
