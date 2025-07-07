import { test } from '../../fixtures/index'
import { expect } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

test('login and save context to json', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-email-input').fill(process.env.LOGIN_EMAIL || '');
    await page.getByTestId('login-password-input').fill(process.env.LOGIN_PASSWORD || '');

    await page.getByTestId('login-submit-button').click();
    await expect(page.getByTestId('user-logout-button')).toBeVisible();
    await page.context().storageState({ path: './tests/setup/.auth/user.json' });
});
