import {ShokMainPage} from "./ShokMainPage";
import {RegistrationPage} from "./RegistrationPage";
import {LoginPage} from "./LoginPage";
import {test as base} from "@playwright/test";

type ShockFixtures = {
    MainPage: ShokMainPage;
    RegistrationPage: RegistrationPage;
    LoginPage: LoginPage;
};

export const test = base.extend<ShockFixtures>({
    MainPage: async ({ page }, use) => {
        const mainPage = new ShokMainPage(page);
        await use(mainPage);
    },
    RegistrationPage: async ({page}, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },
    LoginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});