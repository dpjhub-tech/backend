import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrganizationOnboardingService } from './organization-onboarding.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import type { AuthenticatedUser } from '../../common/guards/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SaveDraftDto } from './dto/save-draft.dto';
import { SubmitApplicationDto } from './dto/submit-application.dto';

@ApiTags('Organization Onboarding')
@ApiBearerAuth('JWT-auth')
@Controller('organization/onboarding')
@UseGuards(SupabaseAuthGuard)
export class OrganizationOnboardingController {
  constructor(
    private readonly onboardingService: OrganizationOnboardingService,
  ) {}

  /** Get or initialize the user's onboarding draft */
  @ApiOperation({
    summary: 'Get or initialize onboarding draft',
    description:
      'Retrieves the existing onboarding draft for the authenticated user, or creates a fresh initial draft record if one does not exist.',
  })
  @ApiResponse({
    status: 200,
    description: 'Draft application returned successfully.',
  })
  @ApiResponse({ status: 401, description: 'Missing or invalid bearer token.' })
  @Get('draft')
  async getDraft(@CurrentUser() user: AuthenticatedUser) {
    return this.onboardingService.getOrCreateDraft(user.id);
  }

  /** Autosave or update progress at any step */
  @ApiOperation({
    summary: 'Save onboarding draft progress',
    description:
      'Performs partial autosave or step-by-step progress save without marking the application as submitted.',
  })
  @ApiResponse({
    status: 200,
    description: 'Draft updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid validation payload.' })
  @ApiResponse({ status: 401, description: 'Missing or invalid bearer token.' })
  @Put('draft')
  async saveDraft(
    @CurrentUser('id') userId: string,
    @Body() dto: SaveDraftDto,
  ) {
    return this.onboardingService.saveDraft(userId, dto);
  }

  /** Final submission of organization application */
  @ApiOperation({
    summary: 'Final submission of organization application',
    description:
      'Validates all mandatory organization information and transitions status to SUBMITTED / IN_REVIEW.',
  })
  @ApiResponse({
    status: 201,
    description: 'Application submitted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Incomplete application draft or validation criteria failed.',
  })
  @ApiResponse({ status: 401, description: 'Missing or invalid bearer token.' })
  @Post('submit')
  async submitApplication(
    @CurrentUser('id') userId: string,
    @Body() dto: SubmitApplicationDto,
  ) {
    return this.onboardingService.submitApplication(userId, dto);
  }

  /** Lightweight status and resume-step query */
  @ApiOperation({
    summary: 'Get onboarding status & resume step',
    description:
      'Returns a lightweight status object indicating current submission status, verification outcome, and resume step.',
  })
  @ApiResponse({
    status: 200,
    description: 'Status returned successfully.',
  })
  @ApiResponse({ status: 401, description: 'Missing or invalid bearer token.' })
  @Get('status')
  async getStatus(@CurrentUser('id') userId: string) {
    return this.onboardingService.getStatus(userId);
  }
}
