import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from 'src/user/entities';

import { ROLES_KEY } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * The constructor function takes a single parameter, which is the Reflector
   * @param {Reflector} reflector - The reflector is used to get the name of a class, given the
   */
  constructor(private reflector: Reflector) {}

  /**
   * If the user has any of the required roles, return true
   * @param {ExecutionContext} context - ExecutionContext
   * @returns A boolean value.
   */
  canActivate(context: ExecutionContext): boolean {
    // get the roles from the metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // if there are no roles required, return true
    if (!requiredRoles) return true;

    // get the user from the request object
    const { user }: { user: User } = context.switchToHttp().getRequest();

    // if the user is not logged in, return false
    if (!user) return false;

    // if the user has any of the required roles, return true
    return this.hasRole(user, requiredRoles);
  }

  /**
   * Given a user and a list of roles, return true if the user has one of the roles
   * @param {User} user - User
   * @param {Role[]} requiredRoles - an array of roles that the user must have to access the route.
   * @returns The return value is a boolean value.
   */
  private hasRole(user: User, requiredRoles: Role[]): boolean {
    return requiredRoles.some(role => user.role === role);
  }
}
