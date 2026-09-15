import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '../../common/enums/role.enum';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AppRole } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: userId },
      include: {
        businessProfile: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async syncProfile(
    userId: string,
    email: string,
    name?: string,
    requestedRole?: Role,
  ) {
    const safeRole =
      requestedRole === Role.ADMIN ? Role.USER : requestedRole || Role.USER;
    const prismaRole = safeRole as unknown as AppRole;

    return this.prisma.profile.upsert({
      where: { id: userId },
      update: {
        email,
        ...(name ? { name } : {}),
      },
      create: {
        id: userId,
        email,
        name: name || '',
        role: prismaRole,
      },
      include: {
        businessProfile: true,
      },
    });
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: { id: userId },
      data: {
        ...dto,
      },
      include: {
        businessProfile: true,
      },
    });
  }

  async getProfilesByRole(role: Role) {
    const prismaRole = role as unknown as AppRole;
    return this.prisma.profile.findMany({
      where: {
        role: prismaRole,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
