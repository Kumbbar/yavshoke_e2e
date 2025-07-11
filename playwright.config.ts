import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: false,
        outputCwd: '.',
      }
    ],
    [
      'html-reporter/playwright',
      {
        enabled: true,
        defaultView: 'failed',
        path: 'html-report',
      }
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://yavshok.ru',

    screenshot: 'only-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'login',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/*login.spec.ts'
    },
    {
      name: 'register',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/*register.spec.ts'
    },

    {
      name: 'exist',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/*exist.spec.ts'
    },
    {
      name: 'profile',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
      testMatch: '**/*profile.spec.ts'
    },
    {
      name: 'edit',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
      testMatch: '**/*edit.spec.ts'
    },
    {
      name: 'setup',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/*.setup.ts',
    },
  ],
});
