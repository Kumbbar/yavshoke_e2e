import { expect, Page } from '@playwright/test';

export class BasePage {
    protected url: string;
    constructor(public readonly page: Page) {
        this.url = null;
    }

    async open() {
        if (!this.url) {
            throw Error("Не задан аттрибут url в конструкторе класса");
        }
        await this.page.goto(this.url);
        await expect(this.page, `Открываем страницу ${this.url}`).toHaveURL(this.url);
    }
    async checkVisibility() {}
}