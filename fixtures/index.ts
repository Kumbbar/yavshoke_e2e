import {ExistPage} from "./ExistPage";
import {RegistrationPage} from "./RegistrationPage";
import {LoginPage} from "./LoginPage";
import {ProfilePage} from "./ProfilePage";
import {EditPage} from "./EditPage";

import {test as base} from "@playwright/test";

type ShockFixtures = {
    existPage: ExistPage;
    registrationPage: RegistrationPage;
    loginPage: LoginPage;
    profilePage: ProfilePage;
    editPage: EditPage
};

export const test = base.extend<ShockFixtures>({
    existPage: async ({ page }, use) => {
        const mainPage = new ExistPage(page);
        await use(mainPage);
    },
    registrationPage: async ({page}, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    profilePage: async ({page}, use) => {
        const profilePage = new ProfilePage(page);
        await use(profilePage);
    },
    editPage: async ({page}, use) => {
        const editPage = new EditPage(page);
        await use(editPage);
    }
});