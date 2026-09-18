"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../enums/role.enum");
const supabase_service_1 = require("../supabase/supabase.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const SELF_ASSIGNABLE_ROLES = [
    role_enum_1.Role.CREATOR,
    role_enum_1.Role.ORGANIZATION,
];
let SupabaseAuthGuard = class SupabaseAuthGuard {
    supabase;
    prisma;
    constructor(supabase, prisma) {
        this.supabase = supabase;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing or invalid Authorization header');
        }
        const token = authHeader.slice('Bearer '.length);
        const user = await this.supabase.getUserFromToken(token);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid or expired authentication token');
        }
        const metaRole = typeof user.user_metadata?.role === 'string'
            ? user.user_metadata.role
            : undefined;
        let role = role_enum_1.Role.USER;
        try {
            const dbProfile = await this.prisma.profile.findUnique({
                where: { id: user.id },
                select: { role: true },
            });
            if (dbProfile?.role) {
                role = (0, role_enum_1.normalizeRole)(dbProfile.role);
            }
            else {
                const rawRole = (0, role_enum_1.normalizeRole)(metaRole);
                if (SELF_ASSIGNABLE_ROLES.includes(rawRole)) {
                    role = rawRole;
                }
            }
        }
        catch {
            const rawRole = (0, role_enum_1.normalizeRole)(metaRole);
            if (SELF_ASSIGNABLE_ROLES.includes(rawRole)) {
                role = rawRole;
            }
        }
        request.user = {
            id: user.id,
            email: user.email,
            name: typeof user.user_metadata?.name === 'string'
                ? user.user_metadata.name
                : undefined,
            role,
        };
        return true;
    }
};
exports.SupabaseAuthGuard = SupabaseAuthGuard;
exports.SupabaseAuthGuard = SupabaseAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        prisma_service_1.PrismaService])
], SupabaseAuthGuard);
//# sourceMappingURL=supabase-auth.guard.js.map