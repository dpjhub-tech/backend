import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class SaveDraftDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  currentStep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  organizationName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  businessType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  industry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  website?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  panNumber?: string;

  @IsOptional()
  @IsBoolean()
  hasGst?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  gstin?: string;

  @IsOptional()
  @IsBoolean()
  hasUdyam?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  udyamNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  secondaryDocType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  shopEstablishmentNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  firmRegistrationNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  addressProofType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  bankAccountNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  bankIfsc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  bankName?: string;

  @IsOptional()
  @IsObject()
  documents?: Record<string, unknown>;

  @IsOptional()
  @IsBoolean()
  declarationAgreed?: boolean;

  @IsOptional()
  @IsBoolean()
  declarationAuthorized?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  digitalSignature?: string;

  @IsOptional()
  @IsString()
  declarationSignedAt?: string;

  @IsOptional()
  @IsBoolean()
  finalPoliciesAgreed?: boolean;
}
