import { young_age_mock, adult_age_mock, old_age_mock } from "./mocks/profile"

import { test } from "../fixtures";
import {expect} from "@playwright/test";

test.use({storageState: 'tests/setup/.auth/user.json'});


test("check age title for young user", async ({ ProfilePage, page }) => {
    await page.goto('/');

    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(young_age_mock)
        });
    });
    await ProfilePage.checkAgeTitle('Ты молоденький котик')

});

test("check age title for adult user", async ({ ProfilePage, page }) => {
    test.skip(true, 'Тест временно отключён, баг');
    await page.goto('/');

    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(adult_age_mock)
        });
    });
    await ProfilePage.checkAgeTitle('Ты взрослый котик')
});

test("check age title for old user", async ({ ProfilePage, page }) => {
    await page.goto('/');

    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(old_age_mock)
        });
    });
    await ProfilePage.checkAgeTitle('Ты старый котик')
    await expect(page).toHaveScreenshot();

});



