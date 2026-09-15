import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Role, normalizeRole } from '../enums/role.enum';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../../prisma/prisma.service';

const SELF_ASSIGNABLE_ROLES: readonly Role[] = [
  Role.CREATOR,
  Role.ORGANIZATION,
];

export interface AuthenticatedUser {
  id: string;
  email?: string;
  name?: string;
  role: Role;
}

declare module 'express' {
  interface Request {
    user?: AuthenticatedUser;
  }
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.slice('Bearer '.length);
    const user = await this.supabase.getUserFromToken(token);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid or expired authentication token',
      );
    }

    // Read metadata role safely
    const metaRole =
      typeof user.user_metadata?.role === 'string'
        ? user.user_metadata.role
        : undefined;

    // Attempt to read profile from DB to get authoritative role
    let role = Role.USER;
    try {
      const dbProfile = await this.prisma.profile.findUnique({
        where: { id: user.id },
        select: { role: true },
      });
      if (dbProfile?.role) {
        role = normalizeRole(dbProfile.role);
      } else {
        const rawRole = normalizeRole(metaRole);
        if (SELF_ASSIGNABLE_ROLES.includes(rawRole)) {
          role = rawRole;
        }
      }
    } catch {
      const rawRole = normalizeRole(metaRole);
      if (SELF_ASSIGNABLE_ROLES.includes(rawRole)) {
        role = rawRole;
      }
    }

    request.user = {
      id: user.id,
      email: user.email,
      name:
        typeof user.user_metadata?.name === 'string'
          ? user.user_metadata.name
          : undefined,
      role,
    };

    return true;
  }
}
