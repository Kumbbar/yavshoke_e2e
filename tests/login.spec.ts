import { test } from '../fixtures/index';
import { getRandomLetters, getRandomIntInRange} from './utils/random';
import {expect} from "@playwright/test";


test('login with empty email', async({ LoginPage }) => {
    await LoginPage.open();
    await LoginPage.tryLogin(
        '',
        getRandomLetters(6)
    );
    await expect(LoginPage.page.getByText('Введите email', {exact: true})).toBeVisible();
});

test('login with empty password', async({ LoginPage }) => {
    await LoginPage.open();
    await LoginPage.tryLogin(
        `${getRandomLetters(8)}@gmail.com`,
        ''
    );
    await expect(LoginPage.page.getByText('Введите пароль', {exact: true})).toBeVisible();
});

test('back to exist button', async({ LoginPage, page }) => {
    await LoginPage.open();
    await LoginPage.backButton.click()
    await expect(page).toHaveURL(/\/$/);
});

test('go to registration button', async({ LoginPage, page }) => {
    await LoginPage.open();
    await LoginPage.toRegisterButton.click()
    await expect(page).toHaveURL(/\/register$/);
});