import {expect, Locator, Page} from '@playwright/test';
import {getUserNameFromLocalStorage} from "../tests/utils/user";
import {BasePage} from "./Base";


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
    }

    async open() {
        await super.open('/');
        this.userName = this.page.getByText(await getUserNameFromLocalStorage(this.page), {exact: true});
    }

    async checkAgeTitle(title: string) {
        await expect(this.page.getByText(title, {exact: true})).toBeVisible()
    }
}