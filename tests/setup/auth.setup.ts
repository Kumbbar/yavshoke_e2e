import { test } from '../../fixtures'
import { expect } from "@playwright/test";
import {VALID_USER} from "../data/auth";
import * as dotenv from "dotenv";

dotenv.config();

test('login and save context to json', async ({ loginPage }) => {
    await loginPage.open()
    await loginPage.login(VALID_USER.EMAIL, VALID_USER.PASSWORD);
    await expect(loginPage.page.getByTestId('user-logout-button')).toBeVisible();
    await loginPage.page.context().storageState({ path: './tests/setup/.auth/user.json' });
});
