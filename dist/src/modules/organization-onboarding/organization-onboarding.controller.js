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
exports.OrganizationOnboardingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const organization_onboarding_service_1 = require("./organization-onboarding.service");
const supabase_auth_guard_1 = require("../../common/guards/supabase-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const save_draft_dto_1 = require("./dto/save-draft.dto");
const submit_application_dto_1 = require("./dto/submit-application.dto");
let OrganizationOnboardingController = class OrganizationOnboardingController {
    onboardingService;
    constructor(onboardingService) {
        this.onboardingService = onboardingService;
    }
    async getDraft(user) {
        return this.onboardingService.getOrCreateDraft(user.id);
    }
    async saveDraft(userId, dto) {
        return this.onboardingService.saveDraft(userId, dto);
    }
    async submitApplication(userId, dto) {
        return this.onboardingService.submitApplication(userId, dto);
    }
    async getStatus(userId) {
        return this.onboardingService.getStatus(userId);
    }
};
exports.OrganizationOnboardingController = OrganizationOnboardingController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get or initialize onboarding draft',
        description: 'Retrieves the existing onboarding draft for the authenticated user, or creates a fresh initial draft record if one does not exist.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Draft application returned successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Missing or invalid bearer token.' }),
    (0, common_1.Get)('draft'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationOnboardingController.prototype, "getDraft", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Save onboarding draft progress',
        description: 'Performs partial autosave or step-by-step progress save without marking the application as submitted.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Draft updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid validation payload.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Missing or invalid bearer token.' }),
    (0, common_1.Put)('draft'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, save_draft_dto_1.SaveDraftDto]),
    __metadata("design:returntype", Promise)
], OrganizationOnboardingController.prototype, "saveDraft", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Final submission of organization application',
        description: 'Validates all mandatory organization information and transitions status to SUBMITTED / IN_REVIEW.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Application submitted successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Incomplete application draft or validation criteria failed.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Missing or invalid bearer token.' }),
    (0, common_1.Post)('submit'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_application_dto_1.SubmitApplicationDto]),
    __metadata("design:returntype", Promise)
], OrganizationOnboardingController.prototype, "submitApplication", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get onboarding status & resume step',
        description: 'Returns a lightweight status object indicating current submission status, verification outcome, and resume step.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Status returned successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Missing or invalid bearer token.' }),
    (0, common_1.Get)('status'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationOnboardingController.prototype, "getStatus", null);
exports.OrganizationOnboardingController = OrganizationOnboardingController = __decorate([
    (0, swagger_1.ApiTags)('Organization Onboarding'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('organization/onboarding'),
    (0, common_1.UseGuards)(supabase_auth_guard_1.SupabaseAuthGuard),
    __metadata("design:paramtypes", [organization_onboarding_service_1.OrganizationOnboardingService])
], OrganizationOnboardingController);
//# sourceMappingURL=organization-onboarding.controller.js.map