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

// ======================================================
// CUSTOM FIXTURES
// ======================================================

type MyFixtures = {

    loginPage: LoginPage;

    welcomePage: WelcomePage;

    adminPage: AdminPage;
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
    }
});

// Export expect
export { expect }
from '@playwright/test';