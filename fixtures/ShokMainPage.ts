import {expect, Locator, Page} from '@playwright/test';


export class ShokMainPage {
    public title: Locator;
    public emailInput: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;

    constructor(public readonly page: Page) {
        this.title = page.getByText('Я в ШОКе', {exact: true});
        this.emailInput = page.getByTestId('main-email-input');
        this.checkButton = page.getByTestId('main-check-button');
        this.toLoginButton = page.getByTestId('main-login-button');
    }

    async open() {
        await this.page.goto('/')
    }

    async checkEmail(email: string, exist: boolean) {
        await this.emailInput.fill(email);
        await this.checkButton.click();
        if (exist) {
            await expect(this.page.locator('img[src*="happyCat"]').first()).toBeVisible();
            await expect(this.page.getByText('Ты уже в ШОКе', {exact: true})).toBeVisible()

        } else {
            await expect(this.page.getByText('Ты еще не в ШОКе', {exact: true})).toBeVisible()
        }
    }
}