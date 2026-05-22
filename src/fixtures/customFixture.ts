import {
    test as base
}
from '@playwright/test';

import { LoginPage }
from '../pages/LoginPage';

import { WelcomePage }
from '../pages/WelcomePage';

import { AdminPage }
from '../pages/AdminPage';
import { HomePage }
from '../pages/HomePage';

type MyFixtures = {

    loginPage: LoginPage;

    welcomePage: WelcomePage;

    adminPage: AdminPage;
    homePage: HomePage;
};
//It put all of our Page Objects together so that when we write an actual test file, our pages are automatically loaded and ready to use without us having to type
export const test =
base.extend<MyFixtures>({

    loginPage:
    async ({ page }, use) => {

        await use(
            new LoginPage(page)
        );
    },


    welcomePage:
    async ({ page }, use) => {

        await use(
            new WelcomePage(page)
        );
    },

   

    adminPage:
    async ({ page }, use) => {

        await use(
            new AdminPage(page)
        );
    },


    homePage:
    async ({ page }, use) => {

        await use(
            new HomePage(page)
        );
    }
});
