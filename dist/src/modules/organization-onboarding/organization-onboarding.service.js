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
exports.OrganizationOnboardingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrganizationOnboardingService = class OrganizationOnboardingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreateDraft(userId) {
        let onboarding = await this.prisma.organizationOnboarding.findUnique({
            where: { userId },
        });
        if (!onboarding) {
            await this.prisma.profile.upsert({
                where: { id: userId },
                update: { role: client_1.AppRole.organization },
                create: {
                    id: userId,
                    email: '',
                    name: '',
                    role: client_1.AppRole.organization,
                },
            });
            onboarding = await this.prisma.organizationOnboarding.create({
                data: {
                    userId,
                    status: client_1.OnboardingStatus.draft,
                    currentStep: 'business-details',
                },
            });
        }
        return onboarding;
    }
    async saveDraft(userId, dto) {
        const { declarationSignedAt, documents, ...rest } = dto;
        const data = {
            ...rest,
        };
        if (documents) {
            data.documents = documents;
        }
        if (declarationSignedAt) {
            data.declarationSignedAt = new Date(declarationSignedAt);
        }
        return this.prisma.organizationOnboarding.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                status: client_1.OnboardingStatus.draft,
                currentStep: dto.currentStep || 'business-details',
                ...rest,
                documents: documents ? documents : {},
                declarationSignedAt: declarationSignedAt
                    ? new Date(declarationSignedAt)
                    : null,
            },
        });
    }
    async submitApplication(userId, dto) {
        const onboarding = await this.prisma.organizationOnboarding.findUnique({
            where: { userId },
        });
        if (!onboarding) {
            throw new common_1.NotFoundException('No onboarding application found to submit');
        }
        if (onboarding.status === client_1.OnboardingStatus.under_review) {
            return onboarding;
        }
        if (!onboarding.organizationName) {
            throw new common_1.BadRequestException('Organization name is required before submission');
        }
        if (!onboarding.digitalSignature && !onboarding.declarationAgreed) {
            throw new common_1.BadRequestException('Declaration and digital signature are required');
        }
        const applicationId = onboarding.applicationId ||
            `ORG-${Math.floor(100000 + Math.random() * 900000)}`;
        const submittedAt = new Date();
        const updated = await this.prisma.organizationOnboarding.update({
            where: { userId },
            data: {
                status: client_1.OnboardingStatus.under_review,
                applicationId,
                submittedAt,
                currentStep: 'all-set',
                finalPoliciesAgreed: dto?.finalPoliciesAgreed ?? true,
            },
        });
        await this.prisma.profile.update({
            where: { id: userId },
            data: {
                role: client_1.AppRole.organization,
            },
        });
        return updated;
    }
    async getStatus(userId) {
        const onboarding = await this.prisma.organizationOnboarding.findUnique({
            where: { userId },
            select: {
                status: true,
                currentStep: true,
                applicationId: true,
                submittedAt: true,
                organizationName: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!onboarding) {
            return {
                status: client_1.OnboardingStatus.draft,
                currentStep: 'business-details',
                applicationId: null,
                submittedAt: null,
            };
        }
        return onboarding;
    }
};
exports.OrganizationOnboardingService = OrganizationOnboardingService;
exports.OrganizationOnboardingService = OrganizationOnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationOnboardingService);
//# sourceMappingURL=organization-onboarding.service.js.map