import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from "./Base";


export class ShokMainPage extends BasePage {
    public title: Locator;
    public emailInput: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.title = page.getByText('Я в ШОКе', {exact: true});
        this.emailInput = page.getByTestId('main-email-input');
        this.checkButton = page.getByTestId('main-check-button');
        this.toLoginButton = page.getByTestId('main-login-button');
    }

    async open() {
        await super.open('/');
    }

    async checkVisibility() {
        await expect(this.emailInput).toBeVisible()
        await expect(this.checkButton).toBeVisible()
        await expect(this.toLoginButton).toBeVisible()
    }

    async checkEmail(email: string, exist: boolean) {
        await this.checkVisibility();
        await this.emailInput.fill(email);
        await this.checkButton.click();
        if (exist) {
            await expect(
                this.page.locator('img[src*="happyCat"]'
                ).first(),
                'Отображается танцующий кот'
            ).toBeVisible();
            await expect(
                this.page.getByText('Ты уже в ШОКе', {exact: true}),
                'Отображается текст о том, что пользователь зарегистрирован'
            ).toBeVisible()

        } else {
            await expect(this.page.getByText(
                'Ты еще не в ШОКе', {exact: true}),
                'Отображается текст о том, что пользователь НЕзарегистрирован'
            ).toBeVisible()
        }
    }
}