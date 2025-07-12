import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";


export class RegistrationPage extends BasePage{
    public emailInput: Locator;
    public passwordInput: Locator;
    public ageInput: Locator;
    public registerButton: Locator;
    public backButton: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.emailInput = page.getByTestId('register-email-input');
        this.passwordInput = page.getByTestId('register-password-input');
        this.ageInput = page.getByTestId('register-age-input');
        this.registerButton = page.getByTestId('register-submit-button');
        this.backButton = page.getByTestId('register-back-button');
        this.url = '/register';
    }

    async checkVisibility() {
        await expect(this.emailInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
        await expect(this.ageInput).toBeVisible()
        await expect(this.registerButton).toBeVisible()
    }

    async register(email: string, password: string,  age: any) {
        await this.checkVisibility()
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password)
        await this.ageInput.fill(String(age));
        await this.registerButton.click();
    }
}