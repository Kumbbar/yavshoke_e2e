import { test } from '../fixtures';
import { getRandomLetters } from './utils/random';
import {expect} from "@playwright/test";
import {VALID_USER} from "./data/auth";


test('Начальное окно: проверка существования для НЕзарегистрированного пользователя', async({ existPage }) => {
	await existPage.open();
	await test.step('Проверка существования почты с рандомными буквами и постфиксом unreg', async () => {
		await existPage.checkEmail(
			`${getRandomLetters(10)}unreg@test.com`,
			false
		);
	});
});

test('Начальное окно: проверка существования для зарегистрированного пользователя', async({ existPage }) => {
	await existPage.open();
	await test.step('Проверка существования почты для зарегистрированного пользователя', async () => {
		await existPage.checkEmail(
			VALID_USER.EMAIL,
			true
		);
	});
});

test('Начальное окно: кнопка неактивна с пустым полем email после открытия страницы', async({ existPage }) => {
	await existPage.open();
	await expect(
		existPage.checkButton,
		'Кнопка имеет аттрибут aria-disabled: true'
	).toHaveAttribute('aria-disabled', 'true');

	await test.step('Заполнение поля ввода email', async () => {
		await existPage.emailInput.fill(getRandomLetters(1));
	});
	await expect(
		existPage.checkButton,
		'Кнопка вообще НЕ имеет аттрибут aria-disabled в true состоянии'
	).not.toHaveAttribute('aria-disabled', 'true');
})


test('Начальное окно: кнопка "В шок" редиректит на окно входа', async({ existPage }) => {
	await existPage.open();
	await test.step('Проверка сущестования кнопки и клик по ней', async () => {
		await expect(existPage.toLoginButton).toBeVisible()
		await existPage.toLoginButton.click()

	});
	await expect(existPage.page, 'Переход на страницу входа').toHaveURL('/login');
})
