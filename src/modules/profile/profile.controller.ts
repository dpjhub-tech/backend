import { Controller, Get, Patch, Post, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import type { AuthenticatedUser } from '../../common/guards/supabase-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /** Get current authenticated user profile and assigned role */
  @Get('me')
  async getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.profileService.getProfile(user.id);
  }

  /** Sync or initialize profile on first login/token verification */
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
  @Patch('me')
  async updateMe(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(userId, dto);
  }

  /** Creator-only protected route */
  @Get('creator/dashboard')
  @Roles(Role.CREATOR)
  getCreatorDashboard(@CurrentUser() user: AuthenticatedUser) {
    return {
      message: 'Creator portal access granted',
      user,
    };
  }

  /** Organization-only protected route */
  @Get('organization/dashboard')
  @Roles(Role.ORGANIZATION)
  getOrganizationDashboard(@CurrentUser() user: AuthenticatedUser) {
    return {
      message: 'Organization portal access granted',
      user,
    };
  }

  /** Admin-only protected route */
  @Get('admin/users')
  @Roles(Role.ADMIN)
  getAdminUserList() {
    return {
      message: 'Admin user management access granted',
    };
  }
}
