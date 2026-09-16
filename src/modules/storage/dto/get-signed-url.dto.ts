import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class GetSignedUrlDto {
  @ApiProperty({
    description: 'Storage bucket identifier',
    enum: ['verification-docs', 'public-assets'],
    example: 'verification-docs',
  })
  @IsString()
  @IsIn(['verification-docs', 'public-assets'])
  bucket: 'verification-docs' | 'public-assets';

  @ApiProperty({
    description: 'Path of the object within the bucket',
    example: '6a42bbbc-0db9-467a-bb48-123456789abc/kyc/pan_card.pdf',
  })
  @IsString()
  @IsNotEmpty()
  path: string;
}
