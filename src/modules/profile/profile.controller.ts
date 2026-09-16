import { Controller, Get, Patch, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import type { AuthenticatedUser } from '../../common/guards/supabase-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Profile')
@ApiBearerAuth('JWT-auth')
@Controller('profile')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /** Get current authenticated user profile and assigned role */
  @ApiOperation({
    summary: 'Get current user profile',
    description:
      'Fetches the authenticated profile from PostgreSQL (or falls back to Supabase metadata).',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  @ApiResponse({ status: 401, description: 'Missing or invalid bearer token.' })
  @Get('me')
  async getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.profileService.getProfile(user.id);
  }

  /** Sync or initialize profile on first login/token verification */
  @ApiOperation({
    summary: 'Sync profile from Supabase auth',
    description:
      'Creates or updates the local user profile row upon first login or token verification.',
  })
  @ApiResponse({
    status: 201,
    description: 'Profile synchronized successfully.',
  })
  @ApiResponse({ status: 401, description: 'Missing or invalid bearer token.' })
  @Post('sync')
  async syncProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.profileService.syncProfile(
      user.id,
      user.email || '',
      user.name,
      user.role,
    );
  }

  /** Update current profile details */
  @ApiOperation({
    summary: 'Update current user profile',
    description:
      'Updates mutable user profile attributes such as name, bio, phone, or designation.',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid validation payload.' })
  @ApiResponse({ status: 401, description: 'Missing or invalid bearer token.' })
  @Patch('me')
  async updateMe(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(userId, dto);
  }

  /** Creator-only protected route */
  @ApiOperation({
    summary: 'Creator portal access check',
    description: 'Protected endpoint accessible only to CREATOR role users.',
  })
  @ApiResponse({ status: 200, description: 'Access granted.' })
  @ApiResponse({ status: 403, description: 'Forbidden role.' })
  @Get('creator/dashboard')
  @Roles(Role.CREATOR)
  getCreatorDashboard(@CurrentUser() user: AuthenticatedUser) {
    return {
      message: 'Creator portal access granted',
      user,
    };
  }

  /** Organization-only protected route */
  @ApiOperation({
    summary: 'Organization portal access check',
    description:
      'Protected endpoint accessible only to ORGANIZATION role users.',
  })
  @ApiResponse({ status: 200, description: 'Access granted.' })
  @ApiResponse({ status: 403, description: 'Forbidden role.' })
  @Get('organization/dashboard')
  @Roles(Role.ORGANIZATION)
  getOrganizationDashboard(@CurrentUser() user: AuthenticatedUser) {
    return {
      message: 'Organization portal access granted',
      user,
    };
  }

  /** Admin-only protected route */
  @ApiOperation({
    summary: 'Admin user management access check',
    description: 'Protected endpoint accessible only to ADMIN role users.',
  })
  @ApiResponse({ status: 200, description: 'Access granted.' })
  @ApiResponse({ status: 403, description: 'Forbidden role.' })
  @Get('admin/users')
  @Roles(Role.ADMIN)
  getAdminUserList() {
    return {
      message: 'Admin user management access granted',
    };
  }
}
