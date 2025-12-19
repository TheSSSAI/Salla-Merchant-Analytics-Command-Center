import { formatISO, parseISO, isValid, format, addDays, subDays, differenceInDays, isBefore, isAfter } from 'date-fns';
import { ValidationError } from '../errors/validation.error';

/**
 * Enterprise-grade date manipulation utilities.
 * wraps date-fns to provide standardized date handling across the application.
 */
export const DateUtils = {
  /**
   * Converts a date input to a strict ISO 8601 string.
   * Handles Date objects, timestamps (numbers), and string dates.
   * 
   * @param date - The input date (Date object, timestamp number, or string)
   * @returns ISO 8601 formatted string
   * @throws ValidationError if the input is not a valid date
   */
  toISO8601(date: Date | string | number): string {
    const parsedDate = this.parseDate(date);
    
    if (!isValid(parsedDate)) {
      throw new ValidationError('Invalid date input provided for ISO conversion');
    }

    return formatISO(parsedDate);
  },

  /**
   * Formats a date to a human-readable display string.
   * Default format: 'yyyy-MM-dd' (Standard)
   * 
   * @param date - The input date
   * @param formatStr - Optional format string (defaults to 'yyyy-MM-dd')
   * @returns Formatted date string
   * @throws ValidationError if the input is invalid
   */
  formatDisplay(date: Date | string | number, formatStr: string = 'yyyy-MM-dd'): string {
    const parsedDate = this.parseDate(date);

    if (!isValid(parsedDate)) {
      throw new ValidationError('Invalid date input provided for display formatting');
    }

    return format(parsedDate, formatStr);
  },

  /**
   * Adds a specified number of days to a date.
   * 
   * @param date - The base date
   * @param amount - Number of days to add
   * @returns New Date object
   */
  addDays(date: Date | string | number, amount: number): Date {
    const parsedDate = this.parseDate(date);
    if (!isValid(parsedDate)) throw new ValidationError('Invalid date input for addDays');
    return addDays(parsedDate, amount);
  },

  /**
   * Subtracts a specified number of days from a date.
   * 
   * @param date - The base date
   * @param amount - Number of days to subtract
   * @returns New Date object
   */
  subDays(date: Date | string | number, amount: number): Date {
    const parsedDate = this.parseDate(date);
    if (!isValid(parsedDate)) throw new ValidationError('Invalid date input for subDays');
    return subDays(parsedDate, amount);
  },

  /**
   * Calculates the difference in days between two dates.
   * 
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   * @returns Number of days difference
   */
  diffInDays(dateLeft: Date | string | number, dateRight: Date | string | number): number {
    const left = this.parseDate(dateLeft);
    const right = this.parseDate(dateRight);
    
    if (!isValid(left) || !isValid(right)) {
      throw new ValidationError('Invalid date input provided for difference calculation');
    }

    return differenceInDays(left, right);
  },

  /**
   * Checks if a date is in the past compared to now.
   * 
   * @param date - The date to check
   * @returns boolean
   */
  isPast(date: Date | string | number): boolean {
    const parsedDate = this.parseDate(date);
    if (!isValid(parsedDate)) throw new ValidationError('Invalid date input for isPast check');
    return isBefore(parsedDate, new Date());
  },

  /**
   * Checks if a date is in the future compared to now.
   * 
   * @param date - The date to check
   * @returns boolean
   */
  isFuture(date: Date | string | number): boolean {
    const parsedDate = this.parseDate(date);
    if (!isValid(parsedDate)) throw new ValidationError('Invalid date input for isFuture check');
    return isAfter(parsedDate, new Date());
  },

  /**
   * Internal helper to normalize inputs into a Date object.
   * 
   * @param date - Input date
   * @returns Date object
   */
  parseDate(date: Date | string | number): Date {
    if (date instanceof Date) return date;
    if (typeof date === 'number') return new Date(date);
    if (typeof date === 'string') return parseISO(date);
    return new Date(NaN); // Invalid date
  }
};

// Export pure functions for tree-shaking if needed individually
export const { toISO8601, formatDisplay, addDays: addDaysToDate, diffInDays, isPast, isFuture } = DateUtils;