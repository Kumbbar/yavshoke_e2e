import { test } from '../fixtures/index';
import { getRandomLetters } from './utils/random';
import {expect} from "@playwright/test";


test('yavshoke for unregistered user', async({ MainPage }) => {
	await MainPage.open();
	await MainPage.checkEmail(
		`${getRandomLetters(10)}unreg@test.com`,
		false
	);
});

test('yavshoke for registered user', async({ MainPage }) => {
	await MainPage.open();
	await MainPage.checkEmail(
		`test@test.ru`,
		true
	);
});

test('check button is disabled with empty email input on start', async({ MainPage }) => {
	await MainPage.open();
	await expect(MainPage.checkButton).toHaveAttribute('aria-disabled', 'true');
	await MainPage.emailInput.fill(getRandomLetters(1));
	await expect(MainPage.checkButton).not.toHaveAttribute('aria-disabled', 'true');
})


test('vshok (to login) button redirect to login', async({ MainPage, page }) => {
	await MainPage.open();
	await MainPage.toLoginButton.click()
	await expect(page).toHaveURL(/\/login$/);
})


