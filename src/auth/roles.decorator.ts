import { SetMetadata } from '@nestjs/common';
import { Role } from './enums/auth.role';

export const ROLES_KEY = 'roles';
// The 'ROLES_KEY' is a constant string used to identify metadata associated with roles.
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// The 'Roles' decorator is a factory function that takes an array of roles and attaches
// them as metadata to the decorated class or method using the 'SetMetadata' function.
