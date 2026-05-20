import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/shared/lib/tests/setup.ts'],
    env: {
      TZ: 'UTC',
    },
  },
  plugins: [
    {
      name: 'svg-mock',
      transform(_, id) {
        if (id.endsWith('.svg?react')) {
          return {
            code: 'export default () => null',
            map: null,
          };
        }
      },
    },
  ],
});
