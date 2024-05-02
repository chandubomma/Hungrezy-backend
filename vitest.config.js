import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    transformMode: {
      web: [/.[tj]sx?$/], // Transforms all JavaScript and TypeScript files
    },
  },
});
