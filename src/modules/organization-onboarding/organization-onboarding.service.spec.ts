import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationOnboardingService } from './organization-onboarding.service';
import { PrismaService } from '../../prisma/prisma.service';
import { OnboardingStatus } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

describe('OrganizationOnboardingService', () => {
  let service: OrganizationOnboardingService;

  const mockPrismaService = {
    profile: {
      upsert: jest.fn(),
      update: jest.fn(),
    },
    organizationOnboarding: {
      findUnique: jest.fn(),
      create: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationOnboardingService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrganizationOnboardingService>(
      OrganizationOnboardingService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return existing draft if found', async () => {
    const mockDraft = {
      id: 'draft-1',
      userId: 'user-1',
      status: OnboardingStatus.draft,
      currentStep: 'business-details',
    };
    mockPrismaService.organizationOnboarding.findUnique.mockResolvedValue(
      mockDraft,
    );

    const result = await service.getOrCreateDraft('user-1');
    expect(result).toEqual(mockDraft);
    expect(
      mockPrismaService.organizationOnboarding.findUnique,
    ).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
    });
  });

  it('should create new draft if none exists', async () => {
    mockPrismaService.organizationOnboarding.findUnique.mockResolvedValue(null);
    const newDraft = {
      id: 'draft-new',
      userId: 'user-2',
      status: OnboardingStatus.draft,
      currentStep: 'business-details',
    };
    mockPrismaService.organizationOnboarding.create.mockResolvedValue(newDraft);

    const result = await service.getOrCreateDraft('user-2');
    expect(result).toEqual(newDraft);
  });

  it('should save draft updates', async () => {
    const updatedDraft = {
      id: 'draft-1',
      userId: 'user-1',
      organizationName: 'Acme Corp',
      currentStep: 'verification-documents',
    };
    mockPrismaService.organizationOnboarding.upsert.mockResolvedValue(
      updatedDraft,
    );

    const result = await service.saveDraft('user-1', {
      organizationName: 'Acme Corp',
      currentStep: 'verification-documents',
    });

    expect(result).toEqual(updatedDraft);
  });

  it('should throw BadRequestException if organizationName is missing on submit', async () => {
    mockPrismaService.organizationOnboarding.findUnique.mockResolvedValue({
      id: 'draft-1',
      userId: 'user-1',
      status: OnboardingStatus.draft,
      organizationName: null,
    });

    await expect(service.submitApplication('user-1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should submit application successfully and generate applicationId', async () => {
    mockPrismaService.organizationOnboarding.findUnique.mockResolvedValue({
      id: 'draft-1',
      userId: 'user-1',
      status: OnboardingStatus.draft,
      organizationName: 'Acme Corp',
      digitalSignature: 'John Doe',
      declarationAgreed: true,
      applicationId: null,
    });

    mockPrismaService.organizationOnboarding.update.mockResolvedValue({
      id: 'draft-1',
      userId: 'user-1',
      status: OnboardingStatus.under_review,
      applicationId: 'ORG-123456',
      currentStep: 'all-set',
    });

    const result = await service.submitApplication('user-1');
    expect(result.status).toBe(OnboardingStatus.under_review);
    expect(mockPrismaService.profile.update).toHaveBeenCalled();
  });
});
