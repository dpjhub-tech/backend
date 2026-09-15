import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { OrganizationOnboardingService } from './organization-onboarding.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import type { AuthenticatedUser } from '../../common/guards/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SaveDraftDto } from './dto/save-draft.dto';
import { SubmitApplicationDto } from './dto/submit-application.dto';

@Controller('organization/onboarding')
@UseGuards(SupabaseAuthGuard)
export class OrganizationOnboardingController {
  constructor(
    private readonly onboardingService: OrganizationOnboardingService,
  ) {}

  /** Get or initialize the user's onboarding draft */
  @Get('draft')
  async getDraft(@CurrentUser() user: AuthenticatedUser) {
    return this.onboardingService.getOrCreateDraft(user.id);
  }

  /** Autosave or update progress at any step */
  @Put('draft')
  async saveDraft(
    @CurrentUser('id') userId: string,
    @Body() dto: SaveDraftDto,
  ) {
    return this.onboardingService.saveDraft(userId, dto);
  }

  /** Final submission of organization application */
  @Post('submit')
  async submitApplication(
    @CurrentUser('id') userId: string,
    @Body() dto: SubmitApplicationDto,
  ) {
    return this.onboardingService.submitApplication(userId, dto);
  }

  /** Lightweight status and resume-step query */
  @Get('status')
  async getStatus(@CurrentUser('id') userId: string) {
    return this.onboardingService.getStatus(userId);
  }
}
