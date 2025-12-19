import { z } from 'zod';

/**
 * Enumeration of allowable roles that can be assigned to team members.
 * Note: 'Owner' is strictly excluded as it cannot be assigned via invitation.
 */
export const TeamRoles = {
  ADMIN: 'Admin',
  ANALYST: 'Analyst',
  MARKETER: 'Marketer',
} as const;

/**
 * Array of allowable role values for validation logic.
 */
export const allowableRoles = [
  TeamRoles.ADMIN,
  TeamRoles.ANALYST,
  TeamRoles.MARKETER,
] as const;

/**
 * Zod schema for validating a team member invitation request.
 * Enforces email formatting and restricts role assignment to non-Owner roles.
 * 
 * Business Rules:
 * - BR-INV-001: Only valid emails allowed.
 * - BR-INV-003: 'Owner' role cannot be assigned.
 */
export const inviteTeamMemberSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' }),
  role: z.enum(allowableRoles, {
    errorMap: () => ({ 
      message: 'Please select a valid role (Admin, Analyst, or Marketer)' 
    }),
  }),
});

/**
 * TypeScript type inferred from the inviteTeamMemberSchema.
 */
export type InviteTeamMemberInput = z.infer<typeof inviteTeamMemberSchema>;

/**
 * Zod schema for validating a request to update an existing team member's role.
 * Ensures that roles can only be updated to valid non-Owner roles.
 */
export const updateTeamMemberRoleSchema = z.object({
  role: z.enum(allowableRoles, {
    errorMap: () => ({ 
      message: 'Invalid role selected. Must be Admin, Analyst, or Marketer.' 
    }),
  }),
});

/**
 * TypeScript type inferred from the updateTeamMemberRoleSchema.
 */
export type UpdateTeamMemberRoleInput = z.infer<typeof updateTeamMemberRoleSchema>;

/**
 * Zod schema for validating team member removal requests.
 * Although often just an ID in the URL, this can be used for body validation if required.
 */
export const removeTeamMemberSchema = z.object({
  memberId: z.string().uuid({ message: 'Invalid member ID format' }),
});

/**
 * TypeScript type inferred from the removeTeamMemberSchema.
 */
export type RemoveTeamMemberInput = z.infer<typeof removeTeamMemberSchema>;