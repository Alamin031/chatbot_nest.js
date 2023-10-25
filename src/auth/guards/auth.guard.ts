import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/auth.role';
import { ROLES_KEY } from '../roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Use the provided context to determine if the user has the required roles to access a route
    // The Reflector is used to retrieve metadata associated with roles

    // Get the required roles metadata from either the handler (method) or the class (controller) in the context
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If there are no required roles specified in the metadata, allow access by returning true
    if (!requiredRoles) {
      return true;
    }

    // Extract the 'user' object from the request in the context. This assumes that user information is available in the request.
    const { user } = context.switchToHttp().getRequest();

    // Check if the user's role (if available) includes any of the required roles. If so, allow access by returning true.
    console.log(user.role);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
