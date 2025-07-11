import { test } from '../../fixtures/index'
import { expect } from "@playwright/test";
import {VALID_USER} from "../data/auth";
import * as dotenv from "dotenv";

dotenv.config();

test('login and save context to json', async ({ LoginPage }) => {
    await LoginPage.open()
    await LoginPage.login(VALID_USER.EMAIL, VALID_USER.PASSWORD);
    await expect(LoginPage.page.getByTestId('user-logout-button')).toBeVisible();
    await LoginPage.page.context().storageState({ path: './tests/setup/.auth/user.json' });
});
