import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role, normalizeRole } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles specified on endpoint or controller, access is granted to any authenticated user
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    const userRole = normalizeRole(user.role);

    // Admin has superuser access to all role-restricted routes
    if (userRole === Role.ADMIN) {
      return true;
    }

    const hasRole = requiredRoles.some(
      (role) => normalizeRole(role) === userRole,
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `Insufficient role privileges. Required: [${requiredRoles.join(', ')}], Current: ${userRole}`,
      );
    }

    return true;
  }
}
