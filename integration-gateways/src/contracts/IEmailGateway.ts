import { GatewayResult } from '../models/GatewayResult';

/**
 * Represents the verification status of a custom sending domain.
 */
export interface DomainVerificationStatus {
  domain: string;
  /** Indicates if the SPF record is correctly configured and verified */
  spfVerified: boolean;
  /** Indicates if the DKIM record is correctly configured and verified */
  dkimVerified: boolean;
  /** Indicates if the Return-Path is correctly configured and verified */
  returnPathVerified: boolean;
}

/**
 * Contract for the Email Service Provider Gateway (e.g., Postmark).
 * Abstracts transactional email sending and domain verification logic.
 */
export interface IEmailGateway {
  /**
   * Sends a transactional email using a predefined template.
   * 
   * @param to - The recipient's email address.
   * @param templateAlias - The unique alias/ID of the template to use.
   * @param model - A key-value map of dynamic data to inject into the template variables.
   * @returns A Promise resolving to a GatewayResult indicating success or failure.
   */
  sendTransactionalEmail(
    to: string, 
    templateAlias: string, 
    model: Record<string, any>
  ): Promise<GatewayResult<void>>;

  /**
   * Verifies the DNS configuration for a custom sending domain.
   * 
   * @param domain - The domain name to verify (e.g., 'mail.mystore.com').
   * @returns A Promise resolving to a GatewayResult containing the verification status.
   */
  verifyDomain(domain: string): Promise<GatewayResult<DomainVerificationStatus>>;

  /**
   * Creates or retrieves the necessary DNS records for a new custom domain.
   * 
   * @param domain - The domain to configure.
   * @returns A Promise resolving to a GatewayResult containing the required DNS record values.
   */
  getDomainDNSRecords(domain: string): Promise<GatewayResult<Record<string, any>>>;
}