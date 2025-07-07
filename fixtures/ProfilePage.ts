import {expect, Locator, Page} from '@playwright/test';
import {getUserNameFromLocalStorage} from "../tests/utils/user";


export class ProfilePage {
    public userName: Locator;
    public ageTitle: Locator;
    public editProfileButton: Locator;
    public LogoutButton: Locator;

    constructor(public readonly page: Page) {
        this.ageTitle = page.getByTestId('main-email-input');
        this.editProfileButton = page.getByTestId('main-check-button');
        this.LogoutButton = page.getByTestId('main-login-button');
    }

    async open() {
        await this.page.goto('/')
        this.userName = this.page.getByText(await getUserNameFromLocalStorage(this.page), {exact: true});

    }

    async checkAgeTitle(title: string) {
        await expect(this.page.getByText(title, {exact: true})).toBeVisible()
    }
}