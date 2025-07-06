import {Locator, Page} from '@playwright/test';


export class RegistrationPage {
    public emailInput: Locator;
    public passwordInput: Locator;
    public ageInput: Locator;
    public registerButton: Locator;
    public backButton: Locator;

    constructor(public readonly page: Page) {
        this.emailInput = page.getByTestId('register-email-input');
        this.passwordInput = page.getByTestId('register-password-input');
        this.ageInput = page.getByTestId('register-age-input');
        this.registerButton = page.getByTestId('register-submit-button');
        this.backButton = page.getByTestId('register-back-button');
    }

    async open() {
        await this.page.goto('/register');
    }

    async tryRegister(email: string, password: string,  age: any) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password)
        await this.ageInput.fill(String(age));
        await this.registerButton.click();
    }
}