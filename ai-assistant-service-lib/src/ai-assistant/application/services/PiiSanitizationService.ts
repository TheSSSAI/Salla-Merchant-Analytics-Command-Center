export class PiiSanitizationService {
  // Regex patterns for detecting common PII types
  private static readonly EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  private static readonly PHONE_REGEX = /\b\+?(\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b/g;
  private static readonly CREDIT_CARD_REGEX = /\b(?:\d{4}[ -]?){3}\d{4}\b/g;
  private static readonly IP_V4_REGEX = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
  
  // Replacements
  private static readonly EMAIL_PLACEHOLDER = '[EMAIL_REDACTED]';
  private static readonly PHONE_PLACEHOLDER = '[PHONE_REDACTED]';
  private static readonly CC_PLACEHOLDER = '[CREDIT_CARD_REDACTED]';
  private static readonly IP_PLACEHOLDER = '[IP_REDACTED]';

  /**
   * Sanitizes text by replacing detected PII with placeholders.
   * This is critical before sending data to external LLM providers.
   * @param text The input string to sanitize.
   * @returns The sanitized string.
   */
  public sanitize(text: string): string {
    if (!text) {
      return '';
    }

    let sanitized = text;

    // Apply regex replacements sequentially
    sanitized = sanitized.replace(PiiSanitizationService.EMAIL_REGEX, PiiSanitizationService.EMAIL_PLACEHOLDER);
    sanitized = sanitized.replace(PiiSanitizationService.PHONE_REGEX, PiiSanitizationService.PHONE_PLACEHOLDER);
    sanitized = sanitized.replace(PiiSanitizationService.CREDIT_CARD_REGEX, PiiSanitizationService.CC_PLACEHOLDER);
    sanitized = sanitized.replace(PiiSanitizationService.IP_V4_REGEX, PiiSanitizationService.IP_PLACEHOLDER);

    return sanitized;
  }

  /**
   * Checks if the text potentially contains PII.
   * Useful for flagging internal logs or audits.
   * @param text The input string to check.
   */
  public containsPii(text: string): boolean {
    if (!text) return false;

    return (
      PiiSanitizationService.EMAIL_REGEX.test(text) ||
      PiiSanitizationService.PHONE_REGEX.test(text) ||
      PiiSanitizationService.CREDIT_CARD_REGEX.test(text) ||
      PiiSanitizationService.IP_V4_REGEX.test(text)
    );
  }

  /**
   * Specifically sanitizes content for logging purposes, possibly preserving partial information
   * if debugging is required, though currently defaults to full redaction for safety.
   */
  public sanitizeForLog(text: string): string {
    return this.sanitize(text);
  }
}