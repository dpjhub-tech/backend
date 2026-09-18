import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SaveDraftDto } from './dto/save-draft.dto';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { AppRole, OnboardingStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrganizationOnboardingService {
  constructor(private readonly prisma: PrismaService) {}

  /** Retrieve the user's current onboarding draft or initialize one */
  async getOrCreateDraft(userId: string) {
    let onboarding = await this.prisma.organizationOnboarding.findUnique({
      where: { userId },
    });

    if (!onboarding) {
      // Ensure profile exists first
      await this.prisma.profile.upsert({
        where: { id: userId },
        update: { role: AppRole.organization },
        create: {
          id: userId,
          email: '',
          name: '',
          role: AppRole.organization,
        },
      });

      onboarding = await this.prisma.organizationOnboarding.create({
        data: {
          userId,
          status: OnboardingStatus.draft,
          currentStep: 'business-details',
        },
      });
    }

    return onboarding;
  }

  /** Save or update onboarding draft fields at any step */
  async saveDraft(userId: string, dto: SaveDraftDto) {
    const { declarationSignedAt, documents, ...rest } = dto;

    const data: Prisma.OrganizationOnboardingUpdateInput = {
      ...rest,
    };

    if (documents) {
      data.documents = documents as Prisma.InputJsonValue;
    }

    if (declarationSignedAt) {
      const parsed = new Date(declarationSignedAt);
      data.declarationSignedAt = !isNaN(parsed.getTime()) ? parsed : new Date();
    }

    const initialSignedAt = declarationSignedAt
      ? (!isNaN(new Date(declarationSignedAt).getTime()) ? new Date(declarationSignedAt) : new Date())
      : null;

    return this.prisma.organizationOnboarding.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        status: OnboardingStatus.draft,
        currentStep: dto.currentStep || 'business-details',
        ...rest,
        documents: documents ? (documents as Prisma.InputJsonValue) : {},
        declarationSignedAt: initialSignedAt,
      },
    });
  }

  /** Submit the final onboarding application for verification */
  async submitApplication(userId: string, dto?: SubmitApplicationDto) {
    const onboarding = await this.prisma.organizationOnboarding.findUnique({
      where: { userId },
    });

    if (!onboarding) {
      throw new NotFoundException('No onboarding application found to submit');
    }

    if (onboarding.status === OnboardingStatus.under_review) {
      return onboarding; // Already submitted
    }

    if (!onboarding.organizationName) {
      throw new BadRequestException(
        'Organization name is required before submission',
      );
    }

    if (!onboarding.digitalSignature && !onboarding.declarationAgreed) {
      throw new BadRequestException(
        'Declaration and digital signature are required',
      );
    }

    const applicationId =
      onboarding.applicationId ||
      `ORG-${Math.floor(100000 + Math.random() * 900000)}`;

    const submittedAt = new Date();

    const updated = await this.prisma.organizationOnboarding.update({
      where: { userId },
      data: {
        status: OnboardingStatus.under_review,
        applicationId,
        submittedAt,
        currentStep: 'all-set',
        finalPoliciesAgreed: dto?.finalPoliciesAgreed ?? true,
      },
    });

    // Ensure Profile role is set to organization
    await this.prisma.profile.update({
      where: { id: userId },
      data: {
        role: AppRole.organization,
      },
    });

    return updated;
  }

  /** Lightweight status query for routing and resuming */
  async getStatus(userId: string) {
    const onboarding = await this.prisma.organizationOnboarding.findUnique({
      where: { userId },
      select: {
        status: true,
        currentStep: true,
        applicationId: true,
        submittedAt: true,
        organizationName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!onboarding) {
      return {
        status: OnboardingStatus.draft,
        currentStep: 'business-details',
        applicationId: null,
        submittedAt: null,
      };
    }

    return onboarding;
  }
}
