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
import { HomePage }
from '../src/pages/HomePage';


test('Login Test', async ({ page }) => {

  const loginPage =
    new LoginPage(page);

  const welcomePage =
    new WelcomePage(page);
    const adminPage =
  new AdminPage(page);
  const homePage =
  new HomePage(page);

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
    'Valrie');
  

await welcomePage
  .selectFromUserDropdown('Admin Panel');

  await adminPage
  .verifyAdminDashboardVisible();
   await adminPage
    .clickEnrollments();

  await adminPage
    .clickEnrollUserButton();

  // Wait for popup
  await adminPage
    .waitForEnrollPopup();


 // 1. Select a random course automatically
  await adminPage.selectCourse();

  // 2. Select the user (matches original method structure perfectly!)
  await adminPage.selectUser(testData.userName);
  // Click Enroll User inside popup
  await adminPage
    .clickPopupEnrollUserButton();

await adminPage.verifyUserEnrolledSuccessfully();
// NEW ADDITION: Navigate back to the main client web dashboard application screen
  await adminPage.clickBackToWebsite();
  
  // Optional: Confirm you are safely back on the Welcome page view
  await welcomePage.verifyWelcomeMessage('Valrie');


  // 🌟 CLICK LOGOUT TO COMPLETE THE CYCLE
  await welcomePage
  .selectFromUserDropdown('logout');
  await homePage
    .verifyOnHomePage();

});