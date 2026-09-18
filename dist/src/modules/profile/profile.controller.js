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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const profile_service_1 = require("./profile.service");
const supabase_auth_guard_1 = require("../../common/guards/supabase-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const update_profile_dto_1 = require("./dto/update-profile.dto");
let ProfileController = class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getMe(user) {
        return this.profileService.getProfile(user.id);
    }
    async syncProfile(user) {
        return this.profileService.syncProfile(user.id, user.email || '', user.name, user.role);
    }
    async updateMe(userId, dto) {
        return this.profileService.updateProfile(userId, dto);
    }
    getCreatorDashboard(user) {
        return {
            message: 'Creator portal access granted',
            user,
        };
    }
    getOrganizationDashboard(user) {
        return {
            message: 'Organization portal access granted',
            user,
        };
    }
    getAdminUserList() {
        return {
            message: 'Admin user management access granted',
        };
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get current user profile',
        description: 'Fetches the authenticated profile from PostgreSQL (or falls back to Supabase metadata).',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Missing or invalid bearer token.' }),
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Sync profile from Supabase auth',
        description: 'Creates or updates the local user profile row upon first login or token verification.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Profile synchronized successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Missing or invalid bearer token.' }),
    (0, common_1.Post)('sync'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "syncProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update current user profile',
        description: 'Updates mutable user profile attributes such as name, bio, phone, or designation.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid validation payload.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Missing or invalid bearer token.' }),
    (0, common_1.Patch)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateMe", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Creator portal access check',
        description: 'Protected endpoint accessible only to CREATOR role users.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Access granted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden role.' }),
    (0, common_1.Get)('creator/dashboard'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.CREATOR),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getCreatorDashboard", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Organization portal access check',
        description: 'Protected endpoint accessible only to ORGANIZATION role users.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Access granted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden role.' }),
    (0, common_1.Get)('organization/dashboard'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ORGANIZATION),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getOrganizationDashboard", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Admin user management access check',
        description: 'Protected endpoint accessible only to ADMIN role users.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Access granted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden role.' }),
    (0, common_1.Get)('admin/users'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getAdminUserList", null);
exports.ProfileController = ProfileController = __decorate([
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('profile'),
    (0, common_1.UseGuards)(supabase_auth_guard_1.SupabaseAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map