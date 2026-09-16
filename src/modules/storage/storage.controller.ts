import {
  Controller,
  ForbiddenException,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import type { AuthenticatedUser } from '../../common/guards/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { GetSignedUrlDto } from './dto/get-signed-url.dto';

@ApiTags('Storage')
@ApiBearerAuth('JWT-auth')
@Controller('storage')
@UseGuards(SupabaseAuthGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @ApiOperation({
    summary: 'Get signed URL for secure file preview or download',
    description:
      'Generates a time-limited signed URL for viewing private files (like KYC documents). Users can only access files in their own folder unless they have ADMIN role.',
  })
  @ApiResponse({
    status: 200,
    description: 'Signed URL generated successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Cannot access another user’s private documents.',
  })
  @ApiResponse({ status: 404, description: 'File not found in storage.' })
  @Get('signed-url')
  async getSignedUrl(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: GetSignedUrlDto,
  ) {
    const { bucket, path } = query;

    // Security check: If accessing private verification-docs, verify ownership or admin privilege
    if (bucket === 'verification-docs') {
      const isOwner = path.startsWith(`${user.id}/`);
      const isAdmin = user.role === Role.ADMIN;

      if (!isOwner && !isAdmin) {
        throw new ForbiddenException(
          'You do not have permission to access this document.',
        );
      }
    }

    return this.storageService.createSignedUrl(bucket, path, 3600);
  }
}
