/**
 * Constants shared across the UI component library.
 * These values serve as default configurations or standard tokens.
 */

export const UI_CONSTANTS = {
  /**
   * Default transition duration for UI animations in milliseconds.
   */
  TRANSITION_DURATION: 200,

  /**
   * Standard z-index values for overlay components.
   */
  Z_INDEX: {
    TOAST: 100,
    MODAL: 50,
    POPOVER: 40,
    DROPDOWN: 30,
    HEADER: 20,
  },

  /**
   * Date format strings for date-fns formatting.
   */
  DATE_FORMATS: {
    DISPLAY: 'MMM dd, yyyy',
    API: 'yyyy-MM-dd',
    DATETIME: 'MMM dd, yyyy HH:mm',
  },

  /**
   * Screen size breakpoints matching Tailwind config.
   */
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1400,
  },
  
  /**
   * Default chart colors for when theme colors are unavailable.
   */
  DEFAULT_CHART_COLORS: [
    '#2563eb', // blue-600
    '#16a34a', // green-600
    '#d97706', // amber-600
    '#dc2626', // red-600
    '#9333ea', // purple-600
  ]
} as const;

export type UiConstants = typeof UI_CONSTANTS;