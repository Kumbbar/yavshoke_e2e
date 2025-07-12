import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";


export class ProfilePage extends BasePage{
    public userName: Locator;
    public ageTitle: Locator;
    public editProfileButton: Locator;
    public LogoutButton: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.ageTitle = page.getByTestId('main-email-input');
        this.editProfileButton = page.getByTestId('main-check-button');
        this.LogoutButton = page.getByTestId('main-login-button');
        this.url = '/';
    }

    async checkAgeTitle(title: string) {
        await expect(this.page.getByText(title, {exact: true})).toBeVisible()
    }
}