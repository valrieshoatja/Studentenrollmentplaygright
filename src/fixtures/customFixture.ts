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
// ======================================================
// CUSTOM FIXTURES
// ======================================================

type MyFixtures = {

    loginPage: LoginPage;

    welcomePage: WelcomePage;

    adminPage: AdminPage;
    homePage: HomePage;
};

export const test =
base.extend<MyFixtures>({

    // ==========================================
    // LOGIN PAGE FIXTURE
    // ==========================================

    loginPage:
    async ({ page }, use) => {

        await use(
            new LoginPage(page)
        );
    },

    // ==========================================
    // WELCOME PAGE FIXTURE
    // ==========================================

    welcomePage:
    async ({ page }, use) => {

        await use(
            new WelcomePage(page)
        );
    },

    // ==========================================
    // ADMIN PAGE FIXTURE
    // ==========================================

    adminPage:
    async ({ page }, use) => {

        await use(
            new AdminPage(page)
        );
    },

    // ==========================================
    // HOME PAGE FIXTURE (🌟 ADD THIS MISSING BLOCK)
    // ==========================================

    homePage:
    async ({ page }, use) => {

        await use(
            new HomePage(page)
        );
    }
});
