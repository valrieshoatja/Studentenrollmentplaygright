import { test }
from '@playwright/test';

import { LoginPage }
from '../src/pages/LoginPage';

import { WelcomePage }
from '../src/pages/WelcomePage';

import { testData }
from '../src/data/testData';

import { AdminPage }
from '../src/pages/AdminPage';

test('Login Test', async ({ page }) => {

  const loginPage =
    new LoginPage(page);

  const welcomePage =
    new WelcomePage(page);
    const adminPage =
  new AdminPage(page);

  // Open home page
  await loginPage.gotoHomePage();

  // Click top login button
  await loginPage.clickTopLoginButton();

  // Wait for login modal to be visible
  await page.locator('#login-email').waitFor({ state: 'visible' });

  // Login
  await loginPage.login(
    testData.adminUsername,
    testData.adminPassword
  );

  // Verify welcome message
  await welcomePage.verifyWelcomeMessage(
    'Valrie'
  );
  await welcomePage
  .clickUserDropdown();

await welcomePage
  .clickAdminPanel();

  await adminPage
  .verifyAdminDashboardVisible();
});