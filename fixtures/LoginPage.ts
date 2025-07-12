import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";


export class LoginPage extends BasePage{
    public emailInput: Locator;
    public passwordInput: Locator;
    public toRegisterButton: Locator;
    public LoginButton: Locator;
    public backButton: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.emailInput = page.getByTestId('login-email-input');
        this.passwordInput = page.getByTestId('login-password-input');
        this.toRegisterButton = page.getByTestId('login-register-button');
        this.LoginButton = page.getByTestId('login-submit-button');
        this.backButton = page.getByTestId('login-back-button');
        this.url = '/login';
    }

    async checkVisibility() {
        await expect(this.emailInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
        await expect(this.LoginButton).toBeVisible()
    }

    async login(email: string, password: string) {
        await this.checkVisibility()
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password)
        await this.LoginButton.click();
    }
}