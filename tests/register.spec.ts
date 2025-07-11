import { test } from '../fixtures';
import { getRandomLetters, getRandomIntInRange} from './utils/random';
import {expect} from "@playwright/test";
import {TIME} from "./config";


test('Окно регистрации: проверка отображения ошибки при регистрации с email не в формате text@text.text', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await test.step('Заполнение email в неправильном формате, остальные поля заполняются верно, а такженажатие на кнопку зарегистрироваться', async () => {
        await RegistrationPage.register(
            `${getRandomLetters(8)}gmail.com`,
            getRandomLetters(6),
            getRandomIntInRange(1, 99)
        );
    });
    await expect(
        RegistrationPage.page.getByText('Неправильный email-адрес', {exact: true}),
        "Отображается ошибка о неправльном email адресе"
    ).toBeVisible();
});

test('Окно регистрации: проверка отображения ошибки при регистрации с пустым email', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await test.step('Заполнение всех полей кроме email и нажатие на кнопку зарегистрироваться', async () => {
        await RegistrationPage.register(
            '',
            getRandomLetters(6),
            getRandomIntInRange(1, 99)
        );
    });
    await expect(
        RegistrationPage.page.getByText('Введите email', {exact: true}),
        'Отображается ошибка о пустом email'
    ).toBeVisible();
});

test('Окно регистрации: проверка отображения ошибки при регистрации с пустым паролем', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await test.step('Заполнение всех полей кроме пароля и нажатие на кнопку зарегистрироваться', async () => {
        await RegistrationPage.register(
            `${getRandomLetters(8)}@gmail.com`,
            '',
            getRandomIntInRange(1, 99)
        );
    });
    await expect(RegistrationPage.page.getByText(
        'Введите пароль', {exact: true}),
        'Отображается ошибка о пустом пароле'
    ).toBeVisible();
});

test('Окно регистрации: проверка отображения ошибки при регистрации с пустым возрастом', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await test.step('Заполнение всех полей кроме возраста и нажатие на кнопку зарегистрироваться', async () => {
        await RegistrationPage.register(
            `${getRandomLetters(8)}@gmail.com`,
            getRandomLetters(6),
            ''
        );
    });
    await expect(RegistrationPage.page.getByText(
        'Введите возраст', {exact: true}),
        'Отображается ошибка о пустом возрасте'
    ).toBeVisible();
});

test('Окно регистрации: проверка отображения ошибки при регистрации с десятичным возрастом', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await test.step('Заполнение всех полей, возраст десятичный и нажатие на кнопку зарегистрироваться', async () => {
        await RegistrationPage.register(
            `${getRandomLetters(8)}@gmail.com`,
            getRandomLetters(6),
            2.2
        );
    });
    await expect(RegistrationPage.page.getByText(
        'Возраст должен быть числом', {exact: true}),
        'Отображается ошибка о неправильном возрасте'
    ).toBeVisible();
});

test('Окно регистрации: проверка отображения ошибки при регистрации с email длинной более 50', async({ RegistrationPage, page }) => {
    test.skip(true, 'Тест временно отключён, постоянно падает, баг, неизвестна обратная связь при ошибке');
    await RegistrationPage.open();
    await test.step('Заполнение всех полей, email длинее 50 и нажатие на кнопку зарегистрироваться', async () => {
        await RegistrationPage.register(
            `${getRandomLetters(8)}@gmail.com`,
            getRandomLetters(6),
            2.2
        );
    });
    await expect(RegistrationPage.page.getByText(
            '???', {exact: true}),
        'Отображается ошибка о email длиннее 50'
    ).toBeVisible();
});

test('Окно регистрации: проверка отображения ошибки при регистрации с паролем длинной меньше 6', async({ RegistrationPage }) => {
    await RegistrationPage.open();
    await test.step('Заполнение всех полей, пароль длинной 5 и нажатие на кнопку зарегистрироваться', async () => {
        await RegistrationPage.register(
            `${getRandomLetters(8)}@gmail.com`,
            getRandomLetters(5),
            getRandomIntInRange(1, 99)
        );
    });

    await expect(
        RegistrationPage.page.getByText('Пароль должен содержать минимум 6 символов', {exact: true}),
        'Отображается ошибка о том, что пароль не может быть меньше 6 символов'
    ).toBeVisible();
});

test('Окно регистрации: проверка регистрации с максимальном возможным по длинне паролем в 20 символов', async({ RegistrationPage, page }) => {
    await RegistrationPage.open();
    await test.step('Заполнение всех полей, пароль длинной 20 и нажатие на кнопку зарегистрироваться', async () => {
        await RegistrationPage.register(
            `${getRandomLetters(8)}@gmail.com`,
            getRandomLetters(20),
            getRandomIntInRange(1, 99)
        );
    });
    await expect(page, 'Открыта страница профиля').toHaveURL('/');

});

test('Окно регистрации: проверка регистрации c паролем длинной больше 20 символов', async({ RegistrationPage, page }) => {
    // Закоментил для демонстрации
    // test.skip(true, 'Тест временно отключён, баг, неизвестны требования при ошибке');
    await RegistrationPage.open();
    await test.step('Заполнение всех полей, пароль длинной 21 и нажатие на кнопку зарегистрироваться', async () => {
        await RegistrationPage.register(
            `${getRandomLetters(8)}@gmail.com`,
            getRandomLetters(21),
            getRandomIntInRange(1, 99)
        );
    });
    await page.waitForTimeout(TIME.LONG_TIME)
    await expect(page, 'Открыта страница регистрации').toHaveURL('/register');

});

test('Окно регистрации: проверка редиректа на страницу логиа после нажатия кнопки "Назад"', async({ RegistrationPage, page }) => {
    await RegistrationPage.open();
    await test.step('Нажатие кнопки "Назад"', async () => {
        await RegistrationPage.backButton.click()
    });
    await expect(page, 'Открыта страница входа').toHaveURL('/login');
});
