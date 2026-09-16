import { Module } from '@nestjs/common';
import { OrganizationOnboardingService } from './organization-onboarding.service';
import { OrganizationOnboardingController } from './organization-onboarding.controller';

@Module({
  controllers: [OrganizationOnboardingController],
  providers: [OrganizationOnboardingService],
  exports: [OrganizationOnboardingService],
})
export class OrganizationOnboardingModule { }
