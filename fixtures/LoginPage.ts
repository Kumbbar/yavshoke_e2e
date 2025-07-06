import {Locator, Page} from '@playwright/test';


export class LoginPage {
    public emailInput: Locator;
    public passwordInput: Locator;
    public toRegisterButton: Locator;
    public LoginButton: Locator;
    public backButton: Locator;

    constructor(public readonly page: Page) {
        this.emailInput = page.getByTestId('login-email-input');
        this.passwordInput = page.getByTestId('login-password-input');
        this.toRegisterButton = page.getByTestId('register-age-input');
        this.LoginButton = page.getByTestId('login-submit-button');
        this.backButton = page.getByTestId('login-register-button');
    }

    async open() {
        await this.page.goto('/login');
    }

    async tryLogin(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password)
        await this.LoginButton.click();
    }
}