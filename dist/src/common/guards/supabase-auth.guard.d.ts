import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../../prisma/prisma.service';
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
export declare class SupabaseAuthGuard implements CanActivate {
    private readonly supabase;
    private readonly prisma;
    constructor(supabase: SupabaseService, prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
