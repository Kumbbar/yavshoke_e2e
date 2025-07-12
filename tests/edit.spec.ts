import { test } from "../fixtures";
import {getRandomLetters} from "./utils/random";
import {VALID_USER} from "./data/auth";
import {expect} from "@playwright/test";

test.use({storageState: 'tests/setup/.auth/user.json'});


test('Окно редактирования: проверка сохранения и отображения нового имени', async ({editPage}) => {
    await editPage.open();
    await test.step('Заполнение формы именем из конфига и переход на страницу профиля', async () => {
        await editPage.editName(VALID_USER.EDIT_NAME);
        await editPage.exitButton.click();
        await expect(editPage.page, 'Открыта страница профиля').toHaveURL('/');
    });
    await expect(editPage.page.getByText(VALID_USER.EDIT_NAME), 'Имя отображается на странице профиля').toBeVisible();
    await test.step('Возвращаем имя на дефолтное из конфига', async () => {
        await editPage.returnDefaultName()
    });
});

test('Окно редактирования: проверка отображения ошибки при попытке сохранить пустое поле', async ({editPage}) => {
    await editPage.open();
    await test.step('Заполнение поля пустым значением', async () => {
        await editPage.editName('');
    });
    await expect(
        editPage.page.getByText('Name is required'),
        'Отображается ошибка о пустом имени'
    ).toBeVisible()

});

test('Окно редактирования: проверка отображения ошибки при попытке сохранить имя длиннее 50 символов', async ({editPage}) => {
    await editPage.open();
    await test.step('Заполнение поля именем длинной более 50', async () => {
        await editPage.editName(getRandomLetters(51));
    });
    await expect(
        editPage.page.getByText('Name must be less than 50 characters'),
        'Отображается ошибка о длинне имени более 50'
    ).toBeVisible()
});
