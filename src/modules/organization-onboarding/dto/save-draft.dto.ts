import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class SaveDraftDto {
  @ApiPropertyOptional({
    description: 'Current active wizard step identifier',
    example: 'company_details',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  currentStep?: string;

  @ApiPropertyOptional({
    description: 'Registered organization / company name',
    example: 'Acme Media Labs Private Limited',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  organizationName?: string;

  @ApiPropertyOptional({
    description: 'Legal structure / business type',
    example: 'private_limited',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  businessType?: string;

  @ApiPropertyOptional({
    description: 'Industry sector',
    example: 'Marketing & Advertising',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  industry?: string;

  @ApiPropertyOptional({
    description: 'Company website URL',
    example: 'https://acmemedia.example.com',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  website?: string;

  @ApiPropertyOptional({
    description: 'Company or Director PAN number',
    example: 'ABCDE1234F',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  panNumber?: string;

  @ApiPropertyOptional({
    description: 'Whether company holds a GSTIN registration',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  hasGst?: boolean;

  @ApiPropertyOptional({
    description: '15-digit GSTIN number',
    example: '29ABCDE1234F1Z5',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  gstin?: string;

  @ApiPropertyOptional({
    description: 'Whether company is registered under MSME Udyam',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  hasUdyam?: boolean;

  @ApiPropertyOptional({
    description: 'MSME Udyam registration number',
    example: 'UDYAM-KR-03-0012345',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  udyamNumber?: string;

  @ApiPropertyOptional({
    description: 'Type of secondary registration document',
    example: 'shop_establishment',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  secondaryDocType?: string;

  @ApiPropertyOptional({
    description: 'Shop & Establishment certificate registration number',
    example: 'SEA/BLR/2023/8891',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  shopEstablishmentNumber?: string;

  @ApiPropertyOptional({
    description: 'Firm or ROC registration number',
    example: 'U72200KA2023PTC123456',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firmRegistrationNumber?: string;

  @ApiPropertyOptional({
    description: 'Type of address verification document',
    example: 'electricity_bill',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  addressProofType?: string;

  @ApiPropertyOptional({
    description: 'Settlement bank account number',
    example: '123456789012',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  bankAccountNumber?: string;

  @ApiPropertyOptional({
    description: 'Settlement bank IFSC code',
    example: 'HDFC0001234',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  bankIfsc?: string;

  @ApiPropertyOptional({
    description: 'Bank institution name',
    example: 'HDFC Bank',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  bankName?: string;

  @ApiPropertyOptional({
    description: 'Uploaded document storage metadata & references',
    example: {
      pan_card: { path: 'org/docs/pan.pdf', verified: false },
    },
  })
  @IsOptional()
  @IsObject()
  documents?: Record<string, unknown>;

  @ApiPropertyOptional({
    description: 'Whether terms declaration has been acknowledged',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  declarationAgreed?: boolean;

  @ApiPropertyOptional({
    description: 'Whether representative is authorized to submit application',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  declarationAuthorized?: boolean;

  @ApiPropertyOptional({
    description: 'Digital signature full name',
    example: 'Alex Morgan',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  digitalSignature?: string;

  @ApiPropertyOptional({
    description: 'Timestamp when declaration was signed (ISO string)',
    example: '2026-09-16T04:20:00.000Z',
  })
  @IsOptional()
  @IsString()
  declarationSignedAt?: string;

  @ApiPropertyOptional({
    description: 'Final agreement to compliance & terms of service',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  finalPoliciesAgreed?: boolean;
}
