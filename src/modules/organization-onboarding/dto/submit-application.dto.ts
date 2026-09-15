import { IsBoolean, IsOptional } from 'class-validator';

export class SubmitApplicationDto {
  @IsOptional()
  @IsBoolean()
  finalPoliciesAgreed?: boolean;
}
