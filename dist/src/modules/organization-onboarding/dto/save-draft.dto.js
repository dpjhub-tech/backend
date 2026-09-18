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
exports.SaveDraftDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SaveDraftDto {
    currentStep;
    organizationName;
    businessType;
    industry;
    website;
    panNumber;
    hasGst;
    gstin;
    hasUdyam;
    udyamNumber;
    secondaryDocType;
    shopEstablishmentNumber;
    firmRegistrationNumber;
    addressProofType;
    bankAccountNumber;
    bankIfsc;
    bankName;
    documents;
    declarationAgreed;
    declarationAuthorized;
    digitalSignature;
    declarationSignedAt;
    finalPoliciesAgreed;
    static _OPENAPI_METADATA_FACTORY() {
        return { currentStep: { required: false, type: () => String, maxLength: 50 }, organizationName: { required: false, type: () => String, maxLength: 150 }, businessType: { required: false, type: () => String, maxLength: 50 }, industry: { required: false, type: () => String, maxLength: 100 }, website: { required: false, type: () => String, maxLength: 255 }, panNumber: { required: false, type: () => String, maxLength: 20 }, hasGst: { required: false, type: () => Boolean }, gstin: { required: false, type: () => String, maxLength: 30 }, hasUdyam: { required: false, type: () => Boolean }, udyamNumber: { required: false, type: () => String, maxLength: 30 }, secondaryDocType: { required: false, type: () => String, maxLength: 50 }, shopEstablishmentNumber: { required: false, type: () => String, maxLength: 50 }, firmRegistrationNumber: { required: false, type: () => String, maxLength: 50 }, addressProofType: { required: false, type: () => String, maxLength: 50 }, bankAccountNumber: { required: false, type: () => String, maxLength: 50 }, bankIfsc: { required: false, type: () => String, maxLength: 20 }, bankName: { required: false, type: () => String, maxLength: 100 }, documents: { required: false, type: "object", additionalProperties: true }, declarationAgreed: { required: false, type: () => Boolean }, declarationAuthorized: { required: false, type: () => Boolean }, digitalSignature: { required: false, type: () => String, maxLength: 100 }, declarationSignedAt: { required: false, type: () => String }, finalPoliciesAgreed: { required: false, type: () => Boolean } };
    }
}
exports.SaveDraftDto = SaveDraftDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Current active wizard step identifier',
        example: 'company_details',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "currentStep", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Registered organization / company name',
        example: 'Acme Media Labs Private Limited',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "organizationName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Legal structure / business type',
        example: 'private_limited',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Industry sector',
        example: 'Marketing & Advertising',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Company website URL',
        example: 'https://acmemedia.example.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Company or Director PAN number',
        example: 'ABCDE1234F',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "panNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether company holds a GSTIN registration',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SaveDraftDto.prototype, "hasGst", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '15-digit GSTIN number',
        example: '29ABCDE1234F1Z5',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "gstin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether company is registered under MSME Udyam',
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SaveDraftDto.prototype, "hasUdyam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'MSME Udyam registration number',
        example: 'UDYAM-KR-03-0012345',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "udyamNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type of secondary registration document',
        example: 'shop_establishment',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "secondaryDocType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Shop & Establishment certificate registration number',
        example: 'SEA/BLR/2023/8891',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "shopEstablishmentNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Firm or ROC registration number',
        example: 'U72200KA2023PTC123456',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "firmRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type of address verification document',
        example: 'electricity_bill',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "addressProofType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Settlement bank account number',
        example: '123456789012',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "bankAccountNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Settlement bank IFSC code',
        example: 'HDFC0001234',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "bankIfsc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Bank institution name',
        example: 'HDFC Bank',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "bankName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Uploaded document storage metadata & references',
        example: {
            pan_card: { path: 'org/docs/pan.pdf', verified: false },
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SaveDraftDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether terms declaration has been acknowledged',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SaveDraftDto.prototype, "declarationAgreed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether representative is authorized to submit application',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SaveDraftDto.prototype, "declarationAuthorized", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Digital signature full name',
        example: 'Alex Morgan',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "digitalSignature", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when declaration was signed (ISO string)',
        example: '2026-09-16T04:20:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SaveDraftDto.prototype, "declarationSignedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Final agreement to compliance & terms of service',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SaveDraftDto.prototype, "finalPoliciesAgreed", void 0);
//# sourceMappingURL=save-draft.dto.js.map