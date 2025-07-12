import { test } from '../fixtures';
import { getRandomLetters } from './utils/random';
import {expect} from "@playwright/test";


test('Окно входа: проверка отображения ошибки при входе с НЕзаполненным email', async({ loginPage }) => {
    await loginPage.open();
    await test.step('Заполнение email пустотой а пароля 6 рандомными буквами', async () => {
        await loginPage.login(
            '',
            getRandomLetters(6)
        );
    });
    await expect(
        loginPage.page.getByText('Введите email', {exact: true}),
        'Отображается ошибка о незаполненном email'
    ).toBeVisible();
});

test('Окно входа: проверка отображения ошибки при входе с НЕзаполненным паролем', async({ loginPage }) => {
    await loginPage.open();
    await test.step('Заполнение пароля пустотой а email валидным значением', async () => {
        await loginPage.login(
            `${getRandomLetters(8)}@gmail.com`,
            ''
        );
    });
    await expect(
        loginPage.page.getByText('Введите пароль', {exact: true}),
    'Отображается ошибка о незаполненном пароле'
    ).toBeVisible();
});

test('Окно входа: проверка редиректа на начальное окно после нажатия кнопки "Назад"', async({ loginPage }) => {
    await loginPage.open();
    await test.step('Нажатие кнопки "Назад"', async () => {
        await loginPage.backButton.click()
    });
    await expect(loginPage.page, 'Открыта начальная страница').toHaveURL('/');
});

test('Окно входа: проверка редиректа на окно регистрации после нажатия кнопки "Регистрация"', async({ loginPage }) => {
    await loginPage.open();
    await test.step('Нажатие кнопки "Регистрация"', async () => {
        await loginPage.toRegisterButton.click()
    });
    await expect(loginPage.page, 'Открыто окно регистрации').toHaveURL('/register');
});