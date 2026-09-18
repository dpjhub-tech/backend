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
exports.StorageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const storage_service_1 = require("./storage.service");
const supabase_auth_guard_1 = require("../../common/guards/supabase-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const get_signed_url_dto_1 = require("./dto/get-signed-url.dto");
let StorageController = class StorageController {
    storageService;
    constructor(storageService) {
        this.storageService = storageService;
    }
    async getSignedUrl(user, query) {
        const { bucket, path } = query;
        if (bucket === 'verification-docs') {
            const isOwner = path.startsWith(`${user.id}/`);
            const isAdmin = user.role === role_enum_1.Role.ADMIN;
            if (!isOwner && !isAdmin) {
                throw new common_1.ForbiddenException('You do not have permission to access this document.');
            }
        }
        return this.storageService.createSignedUrl(bucket, path, 3600);
    }
};
exports.StorageController = StorageController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get signed URL for secure file preview or download',
        description: 'Generates a time-limited signed URL for viewing private files (like KYC documents). Users can only access files in their own folder unless they have ADMIN role.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Signed URL generated successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden: Cannot access another user’s private documents.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'File not found in storage.' }),
    (0, common_1.Get)('signed-url'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_signed_url_dto_1.GetSignedUrlDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "getSignedUrl", null);
exports.StorageController = StorageController = __decorate([
    (0, swagger_1.ApiTags)('Storage'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('storage'),
    (0, common_1.UseGuards)(supabase_auth_guard_1.SupabaseAuthGuard),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map