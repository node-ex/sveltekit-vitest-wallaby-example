/**
 * Used for app's unit tests of client code using Node.js and JSDOM.
 */

import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        include: ['src/**/*.dom-test.{js,ts}'],
        environment: 'jsdom',
        setupFiles: ['./vitest.dom.setup.ts'],
      },
    }),
  ),
);
