import { z } from 'zod';
import { commonValidations } from './common.schema';

// -----------------------------------------------------------------------------
// Enums
// -----------------------------------------------------------------------------

/**
 * Defined user roles within the system used for RBAC.
 */
export enum UserRole {
  OWNER = 'Owner',
  ADMIN = 'Admin',
  ANALYST = 'Analyst',
  MARKETER = 'Marketer',
}

// -----------------------------------------------------------------------------
// Base Schema
// -----------------------------------------------------------------------------

/**
 * Base user properties shared across different operations.
 */
export const BaseUserSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name cannot exceed 50 characters')
    .trim(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name cannot exceed 50 characters')
    .trim(),
  email: commonValidations.email,
  role: z.nativeEnum(UserRole).default(UserRole.ANALYST),
  isActive: z.boolean().default(true),
  avatarUrl: z.string().url().optional().or(z.literal('')),
});

// -----------------------------------------------------------------------------
// Operational Schemas
// -----------------------------------------------------------------------------

/**
 * Schema for creating a new user (Internal/Admin flow).
 * Requires standard password complexity validation from common schemas.
 */
export const CreateUserSchema = BaseUserSchema.extend({
  password: commonValidations.password,
}).strict();

/**
 * Schema for user self-registration.
 * Includes password confirmation and terms agreement validation.
 */
export const RegisterUserSchema = z
  .object({
    email: commonValidations.email,
    password: commonValidations.password,
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the Terms of Service and Privacy Policy',
    }),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be attached to confirmPassword field
  });

/**
 * Schema for updating an existing user.
 * All fields are optional.
 */
export const UpdateUserSchema = BaseUserSchema.partial().strict();

/**
 * Schema for user login credentials.
 */
export const LoginSchema = z.object({
  email: commonValidations.email,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
}).strict();

/**
 * Schema for inviting a team member.
 * Only requires email and role.
 */
export const InviteUserSchema = z.object({
  email: commonValidations.email,
  role: z.nativeEnum(UserRole),
}).strict();

/**
 * Schema for accepting an invitation and setting up the account.
 */
export const AcceptInviteSchema = z.object({
  invitationToken: z.string().min(1, 'Invitation token is required'),
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().min(1, 'Last name is required').trim(),
  password: commonValidations.password,
  confirmPassword: z.string(),
})
.strict()
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// -----------------------------------------------------------------------------
// Type Definitions (Inferred)
// -----------------------------------------------------------------------------

export type BaseUserDto = z.infer<typeof BaseUserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type InviteUserDto = z.infer<typeof InviteUserSchema>;
export type AcceptInviteDto = z.infer<typeof AcceptInviteSchema>;