import {expect, Locator, Page} from '@playwright/test';
import {VALID_USER} from "../tests/data/auth";
import {BasePage} from "./BasePage";
import {TIME} from "../tests/config";


export class EditPage extends BasePage {
    public editNameInput: Locator;
    public saveButton: Locator;
    public exitButton: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.editNameInput = page.getByTestId('edit-name-input');
        this.saveButton = page.getByTestId('edit-save-button');
        this.exitButton = page.getByTestId('edit-cancel-button');
        this.url = '/edit';
    }

    async checkVisibility() {
        await expect(this.editNameInput).toBeVisible()
        await expect(this.saveButton).toBeVisible()
        await expect(this.exitButton).toBeVisible()
    }

    async editName(name: string) {
        await this.checkVisibility()
        await this.editNameInput.fill(name);
        await this.saveButton.click();
        await this.page.waitForTimeout(TIME.SHORT_TIME);
    }

    async returnDefaultName() {
        await this.open()
        await this.editName(VALID_USER.DEFAULT_NAME)
    }
}