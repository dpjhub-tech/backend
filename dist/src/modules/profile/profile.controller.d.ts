import { ProfileService } from './profile.service';
import type { AuthenticatedUser } from '../../common/guards/supabase-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getMe(user: AuthenticatedUser): Promise<{
        businessProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            govIdType: import("@prisma/client").$Enums.GovIdType;
            govIdDocUrl: string;
            profileId: string;
            businessName: string;
            businessType: import("@prisma/client").$Enums.BusinessType;
            address: string;
            registrationDocUrl: string;
            supportingDocUrl: string | null;
            verificationStatus: string;
        } | null;
    } & {
        name: string;
        username: string | null;
        bio: string | null;
        phone: string | null;
        designation: string | null;
        designationCustom: string | null;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.AppRole;
        avgRating: number;
        ratingCount: number;
        avatarUrl: string | null;
        isVerified: boolean;
        walletCredits: number;
        createdAt: Date;
        updatedAt: Date;
        govIdType: import("@prisma/client").$Enums.GovIdType | null;
        govIdDocUrl: string | null;
        govIdStatus: string;
    }>;
    syncProfile(user: AuthenticatedUser): Promise<{
        businessProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            govIdType: import("@prisma/client").$Enums.GovIdType;
            govIdDocUrl: string;
            profileId: string;
            businessName: string;
            businessType: import("@prisma/client").$Enums.BusinessType;
            address: string;
            registrationDocUrl: string;
            supportingDocUrl: string | null;
            verificationStatus: string;
        } | null;
    } & {
        name: string;
        username: string | null;
        bio: string | null;
        phone: string | null;
        designation: string | null;
        designationCustom: string | null;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.AppRole;
        avgRating: number;
        ratingCount: number;
        avatarUrl: string | null;
        isVerified: boolean;
        walletCredits: number;
        createdAt: Date;
        updatedAt: Date;
        govIdType: import("@prisma/client").$Enums.GovIdType | null;
        govIdDocUrl: string | null;
        govIdStatus: string;
    }>;
    updateMe(userId: string, dto: UpdateProfileDto): Promise<{
        businessProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            govIdType: import("@prisma/client").$Enums.GovIdType;
            govIdDocUrl: string;
            profileId: string;
            businessName: string;
            businessType: import("@prisma/client").$Enums.BusinessType;
            address: string;
            registrationDocUrl: string;
            supportingDocUrl: string | null;
            verificationStatus: string;
        } | null;
    } & {
        name: string;
        username: string | null;
        bio: string | null;
        phone: string | null;
        designation: string | null;
        designationCustom: string | null;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.AppRole;
        avgRating: number;
        ratingCount: number;
        avatarUrl: string | null;
        isVerified: boolean;
        walletCredits: number;
        createdAt: Date;
        updatedAt: Date;
        govIdType: import("@prisma/client").$Enums.GovIdType | null;
        govIdDocUrl: string | null;
        govIdStatus: string;
    }>;
    getCreatorDashboard(user: AuthenticatedUser): {
        message: string;
        user: AuthenticatedUser;
    };
    getOrganizationDashboard(user: AuthenticatedUser): {
        message: string;
        user: AuthenticatedUser;
    };
    getAdminUserList(): {
        message: string;
    };
}
