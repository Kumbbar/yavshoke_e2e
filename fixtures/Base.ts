import { expect, Page } from '@playwright/test';

export class BasePage {
    constructor(public readonly page: Page) {}

    async open(url) {
        await this.page.goto(url);
        await expect(this.page, `Открываем страницу ${url}`).toHaveURL(url);
    }
    async checkVisibility() {}
}