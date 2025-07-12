import { young_age_mock, adult_age_mock, old_age_mock } from "./mocks/profile"

import { test } from "../fixtures";

test.use({storageState: 'tests/setup/.auth/user.json'});


test("check age title for young user", async ({ profilePage }) => {
    await profilePage.page.goto('/');

    await profilePage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(young_age_mock)
        });
    });
    await profilePage.checkAgeTitle('Ты молоденький котик')

});

test("check age title for adult user", async ({ profilePage }) => {
    test.skip(true, 'Тест временно отключён, баг');
    await profilePage.page.goto('/');

    await profilePage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(adult_age_mock)
        });
    });
    await profilePage.checkAgeTitle('Ты взрослый котик')
});

test("check age title for old user", async ({ profilePage }) => {
    await profilePage.page.goto('/');

    await profilePage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(old_age_mock)
        });
    });
    await profilePage.checkAgeTitle('Ты старый котик')
});
