import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { Role } from '../enums/role.enum';
import { AuthenticatedUser } from './supabase-auth.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  const createMockContext = (user?: AuthenticatedUser): ExecutionContext => {
    return {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    } as unknown as ExecutionContext;
  };

  it('should allow access if no roles are required on the handler/class', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const context = createMockContext({ id: '1', role: Role.USER });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw UnauthorizedException if user is missing on a role-protected route', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.CREATOR]);
    const context = createMockContext(undefined);

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should allow user with matching role (Role.CREATOR)', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.CREATOR]);
    const context = createMockContext({ id: '1', role: Role.CREATOR });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow user with matching role (Role.ORGANIZATION)', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([Role.ORGANIZATION]);
    const context = createMockContext({ id: '1', role: Role.ORGANIZATION });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException if regular USER tries to access CREATOR route', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.CREATOR]);
    const context = createMockContext({ id: '1', role: Role.USER });

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException if regular USER tries to access ORGANIZATION route', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([Role.ORGANIZATION]);
    const context = createMockContext({ id: '1', role: Role.USER });

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should always allow ADMIN to access any role-restricted route', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([Role.ORGANIZATION]);
    const context = createMockContext({ id: 'admin-1', role: Role.ADMIN });

    expect(guard.canActivate(context)).toBe(true);
  });
});
