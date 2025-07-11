import { test } from "../fixtures";
import {getRandomLetters} from "./utils/random";
import {VALID_USER} from "./data/auth";
import {expect} from "@playwright/test";

test.use({storageState: 'tests/setup/.auth/user.json'});


test('Окно редактирования: проверка сохранения и отображения нового имени', async ({EditPage, page}) => {
    await EditPage.open();
    await test.step('Заполнение формы именем из конфига и переход на страницу профиля', async () => {
        await EditPage.editName(VALID_USER.EDIT_NAME);
        await EditPage.exitButton.click();
        await expect(page, 'Открыта страница профиля').toHaveURL('/');
    });
    await expect(page.getByText(VALID_USER.EDIT_NAME), 'Имя отображается на странице профиля').toBeVisible();
    await test.step('Возвращаем имя на дефолтное из конфига', async () => {
        await EditPage.returnDefaultName()
    });
});

test('Окно редактирования: проверка отображения ошибки при попытке сохранить пустое поле', async ({EditPage}) => {
    await EditPage.open();
    await test.step('Заполнение поля пустым значением', async () => {
        await EditPage.editName('');
    });
    await expect(
        EditPage.page.getByText('Name is required'),
        'Отображается ошибка о пустом имени'
    ).toBeVisible()

});

test('Окно редактирования: проверка отображения ошибки при попытке сохранить имя длиннее 50 символов', async ({EditPage}) => {
    await EditPage.open();
    await test.step('Заполнение поля именем длинной более 50', async () => {
        await EditPage.editName(getRandomLetters(51));
    });
    await expect(
        EditPage.page.getByText('Name must be less than 50 characters'),
        'Отображается ошибка о длинне имени более 50'
    ).toBeVisible()
});
