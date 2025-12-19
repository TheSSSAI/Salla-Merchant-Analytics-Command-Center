module.exports = {
  plugins: {
    // Tailwind CSS processing
    tailwindcss: {
      config: './apps/web/tailwind.config.ts',
    },
    // Vendor prefixing for browser compatibility
    autoprefixer: {},
  },
};