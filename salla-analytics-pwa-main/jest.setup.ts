import '@testing-library/jest-dom';

// Mock ResizeObserver for Recharts and other UI components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock fetch for API calls
global.fetch = jest.fn();