export enum Role {
  USER = 'user',
  CREATOR = 'creator',
  ORGANIZATION = 'organization',
  ADMIN = 'admin',
}

// Maps incoming roles (such as legacy 'business') to the canonical Role enum
export function normalizeRole(role: string | null | undefined): Role {
  if (!role) return Role.USER;
  const lower = role.toLowerCase();
  if (lower === 'creator') return Role.CREATOR;
  if (lower === 'organization' || lower === 'business')
    return Role.ORGANIZATION;
  if (lower === 'admin') return Role.ADMIN;
  return Role.USER;
}
