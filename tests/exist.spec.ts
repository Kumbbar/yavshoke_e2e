import { test } from '../fixtures';
import { getRandomLetters } from './utils/random';
import {expect} from "@playwright/test";
import {VALID_USER} from "./data/auth";


test('Начальное окно: проверка существования для НЕзарегистрированного пользователя', async({ MainPage, page }) => {
	await MainPage.open();
	await test.step('Проверка существования почты с рандомными буквами и постфиксом unreg', async () => {
		await MainPage.checkEmail(
			`${getRandomLetters(10)}unreg@test.com`,
			false
		);
	});
});

test('Начальное окно: проверка существования для зарегистрированного пользователя', async({ MainPage }) => {
	await MainPage.open();
	await test.step('Проверка существования почты для зарегистрированного пользователя', async () => {
		await MainPage.checkEmail(
			VALID_USER.EMAIL,
			true
		);
	});
});

test('Начальное окно: кнопка неактивна с пустым полем email после открытия страницы', async({ MainPage }) => {
	await MainPage.open();
	await expect(
		MainPage.checkButton,
		'Кнопка имеет аттрибут aria-disabled: true'
	).toHaveAttribute('aria-disabled', 'true');

	await test.step('Заполнение поля ввода email', async () => {
		await MainPage.emailInput.fill(getRandomLetters(1));
	});
	await expect(
		MainPage.checkButton,
		'Кнопка вообще НЕ имеет аттрибут aria-disabled в true состоянии'
	).not.toHaveAttribute('aria-disabled', 'true');
})


test('Начальное окно: кнопка "В шок" редиректит на окно входа', async({ MainPage, page }) => {
	await MainPage.open();
	await test.step('Проверка сущестования кнопки и клик по ней', async () => {
		await expect(MainPage.toLoginButton).toBeVisible()
		await MainPage.toLoginButton.click()

	});
	await expect(page, 'Переход на страницу входа').toHaveURL('/login');
})


