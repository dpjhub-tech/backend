import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'Full name of the user',
    example: 'Alex Morgan',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Unique username / handle',
    example: 'alexmorgan',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @ApiPropertyOptional({
    description: 'User biography / summary',
    example: 'Product manager and creator.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @ApiPropertyOptional({
    description: 'Contact phone number',
    example: '+919876543210',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Professional designation/role title',
    example: 'Founder',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  designation?: string;

  @ApiPropertyOptional({
    description: 'Custom designation if not listed in default choices',
    example: 'Chief Operations Lead',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  designationCustom?: string;
}
