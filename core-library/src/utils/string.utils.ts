import { ValidationError } from '../errors/validation.error';

/**
 * Enterprise-grade string manipulation utilities.
 * Provides standard transformation and generation functions.
 */
export const StringUtils = {
  /**
   * Capitalizes the first letter of a string and lowercases the rest.
   * 
   * @param str - Input string
   * @returns Capitalized string
   */
  capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * Converts a string to a URL-friendly slug.
   * Replaces spaces/symbols with hyphens, lowercases, removes non-alphanumerics.
   * 
   * @param str - Input string
   * @returns Slug string
   */
  slugify(str: string): string {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-');  // Replace multiple - with single -
  },

  /**
   * Truncates a string to a specified length and appends an ellipsis.
   * 
   * @param str - Input string
   * @param length - Maximum length (including ellipsis)
   * @returns Truncated string
   */
  truncate(str: string, length: number = 100): string {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length - 3) + '...';
  },

  /**
   * Converts a string to camelCase.
   * Useful for mapping API keys to internal object keys.
   * 
   * @param str - Input string
   * @returns camelCased string
   */
  toCamelCase(str: string): string {
    if (!str) return '';
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  },

  /**
   * Generates a random alphanumeric string of specified length.
   * Useful for correlation IDs or temp tokens.
   * Not cryptographically secure (use crypto module for security).
   * 
   * @param length - Length of string
   * @returns Random string
   */
  generateRandomString(length: number = 16): string {
    if (length <= 0) throw new ValidationError('Length must be positive');
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * Checks if a string is a valid UUID (v4).
   * 
   * @param str - Input string
   * @returns boolean
   */
  isUuid(str: string): boolean {
    if (!str) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  },

  /**
   * Sanitizes a string by removing potential HTML tags.
   * Basic protection against simple XSS in display strings.
   * 
   * @param str - Input string
   * @returns Sanitized string
   */
  stripHtml(str: string): string {
    if (!str) return '';
    return str.replace(/<[^>]*>?/gm, '');
  }
};

export const { capitalize, slugify, truncate, toCamelCase, generateRandomString, isUuid, stripHtml } = StringUtils;