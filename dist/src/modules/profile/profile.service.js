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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const role_enum_1 = require("../../common/enums/role.enum");
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        const profile = await this.prisma.profile.findUnique({
            where: { id: userId },
            include: {
                businessProfile: true,
            },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        return profile;
    }
    async syncProfile(userId, email, name, requestedRole) {
        const safeRole = requestedRole === role_enum_1.Role.ADMIN ? role_enum_1.Role.USER : requestedRole || role_enum_1.Role.USER;
        const prismaRole = safeRole;
        return this.prisma.profile.upsert({
            where: { id: userId },
            update: {
                email,
                ...(name ? { name } : {}),
            },
            create: {
                id: userId,
                email,
                name: name || '',
                role: prismaRole,
            },
            include: {
                businessProfile: true,
            },
        });
    }
    async updateProfile(userId, dto) {
        return this.prisma.profile.update({
            where: { id: userId },
            data: {
                ...dto,
            },
            include: {
                businessProfile: true,
            },
        });
    }
    async getProfilesByRole(role) {
        const prismaRole = role;
        return this.prisma.profile.findMany({
            where: {
                role: prismaRole,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map