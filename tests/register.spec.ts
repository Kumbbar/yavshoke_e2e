import { test } from '../fixtures/index';
import { getRandomLetters, getRandomIntInRange} from './utils/random';
import {expect} from "@playwright/test";


test('register with email with not text@text.text format', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await RegistrationPage.tryRegister(
        `${getRandomLetters(8)}gmail.com`,
        getRandomLetters(6),
        getRandomIntInRange(1, 99)
    );
    await expect(RegistrationPage.page.getByText('Неправильный email-адрес', {exact: true})).toBeVisible();
});

test('register with empty email', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await RegistrationPage.tryRegister(
        '',
        getRandomLetters(6),
        getRandomIntInRange(1, 99)
    );
    await expect(RegistrationPage.page.getByText('Введите email', {exact: true})).toBeVisible();
});

test('register with empty password', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await RegistrationPage.tryRegister(
        `${getRandomLetters(8)}@gmail.com`,
        '',
        getRandomIntInRange(1, 99)
    );
    await expect(RegistrationPage.page.getByText('Введите пароль', {exact: true})).toBeVisible();
});

test('register with empty age', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await RegistrationPage.tryRegister(
        `${getRandomLetters(8)}@gmail.com`,
        getRandomLetters(6),
        ''
    );
    await expect(RegistrationPage.page.getByText('Введите возраст', {exact: true})).toBeVisible();
});

test('register with decimal age', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await RegistrationPage.tryRegister(
        `${getRandomLetters(8)}@gmail.com`,
        getRandomLetters(6),
        2.2
    );
    await expect(RegistrationPage.page.getByText('Возраст должен быть числом', {exact: true})).toBeVisible();
});

test('register with email longer than 50 chars', async({ RegistrationPage, page }) => {
    test.skip(true, 'Тест временно отключён, постоянно падает, баг, неизвестна обратная связь при ошибке');
    await RegistrationPage.open();
    await RegistrationPage.tryRegister(
        `${getRandomLetters(50)}@gmail.com`,
        getRandomLetters(6),
        getRandomIntInRange(1, 99)
    );
    // await expect(RegistrationPage.page.getByText('???', {exact: true})).toBeVisible();
    expect(page.url()).toMatch(/\/register$/);

});

test('register with 5 chars password', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await RegistrationPage.tryRegister(
        `${getRandomLetters(8)}@gmail.com`,
        getRandomLetters(5),
        getRandomIntInRange(1, 99)
    );
    await expect(RegistrationPage.page.getByText('Пароль должен содержать минимум 6 символов', {exact: true})).toBeVisible();
});

test('register with 20 chars password', async({ RegistrationPage, page }) => {
    await RegistrationPage.open();
    await RegistrationPage.tryRegister(
        `${getRandomLetters(8)}@gmail.com`,
        getRandomLetters(20),
        getRandomIntInRange(1, 99)
    );
    await expect(page).toHaveURL(/\/$/);

});

test('register with 21 chars password', async({ RegistrationPage, page }) => {
    test.skip(true, 'Тест временно отключён, баг, неизвестна обратная связь при ошибке');
    await RegistrationPage.open();
    await RegistrationPage.tryRegister(
        `${getRandomLetters(8)}@gmail.com`,
        getRandomLetters(21),
        getRandomIntInRange(1, 99)
    );
    expect(page.url()).toMatch(/\/register$/);
});

test('back to login button', async({ RegistrationPage, page }) => {
    await RegistrationPage.open();
    await RegistrationPage.backButton.click()
    await expect(page).toHaveURL(/\/login$/);
});
