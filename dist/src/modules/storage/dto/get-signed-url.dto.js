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
exports.GetSignedUrlDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetSignedUrlDto {
    bucket;
    path;
    static _OPENAPI_METADATA_FACTORY() {
        return { bucket: { required: true, enum: ["verification-docs", "public-assets"], enum: ['verification-docs', 'public-assets'] }, path: { required: true, type: () => String } };
    }
}
exports.GetSignedUrlDto = GetSignedUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Storage bucket identifier',
        enum: ['verification-docs', 'public-assets'],
        example: 'verification-docs',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['verification-docs', 'public-assets']),
    __metadata("design:type", String)
], GetSignedUrlDto.prototype, "bucket", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Path of the object within the bucket',
        example: '6a42bbbc-0db9-467a-bb48-123456789abc/kyc/pan_card.pdf',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetSignedUrlDto.prototype, "path", void 0);
//# sourceMappingURL=get-signed-url.dto.js.map