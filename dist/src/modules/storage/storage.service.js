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
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../common/supabase/supabase.service");
let StorageService = class StorageService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async createSignedUrl(bucket, path, expiresIn = 3600) {
        const { data, error } = await this.supabaseService.admin.storage
            .from(bucket)
            .createSignedUrl(path, expiresIn);
        if (error || !data?.signedUrl) {
            throw new common_1.NotFoundException(`Failed to generate signed URL for "${path}": ${error?.message || 'File not found'}`);
        }
        return {
            signedUrl: data.signedUrl,
            expiresIn,
        };
    }
    async createSignedUploadUrl(bucket, path) {
        const { data, error } = await this.supabaseService.admin.storage
            .from(bucket)
            .createSignedUploadUrl(path);
        if (error || !data) {
            throw new common_1.InternalServerErrorException(`Failed to generate upload URL: ${error?.message}`);
        }
        return {
            signedUrl: data.signedUrl,
            token: data.token,
            path: data.path,
        };
    }
    async deleteFile(bucket, path) {
        const { error } = await this.supabaseService.admin.storage
            .from(bucket)
            .remove([path]);
        if (error) {
            throw new common_1.InternalServerErrorException(`Failed to delete file from storage: ${error.message}`);
        }
    }
    getPublicUrl(bucket, path) {
        const { data } = this.supabaseService.admin.storage
            .from(bucket)
            .getPublicUrl(path);
        return data.publicUrl;
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], StorageService);
//# sourceMappingURL=storage.service.js.map