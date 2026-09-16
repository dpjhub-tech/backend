import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class SubmitApplicationDto {
  @ApiPropertyOptional({
    description:
      'Final confirmation and acceptance of compliance policies and terms of service',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  finalPoliciesAgreed?: boolean;
}
