import { test } from '../src/fixtures/customFixture';
import { expect } from '@playwright/test';
import { testData } from '../src/data/testData';

test.describe('Negative StudentEnrollment Tests', () => {

  // 🌟 TEST 1: THE INVALID LOGIN TEST
  test('Should display error with invalid login credentials', async ({ loginPage, page }) => {
    await loginPage.gotoHomePage();
    await loginPage.clickTopLoginButton();

    // Listen for the native browser popup dialog
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Invalid credentials');
      await dialog.accept(); 
    });

    await loginPage.login(testData.adminUsername, testData.invalidPassword);
    await page.waitForTimeout(2000);
  });


  // 🌟 TEST 2: THE MISSING USER ENROLLMENT TEST
  test('Should not allow enrolling a student without selecting a user', async ({ loginPage, welcomePage, adminPage, page }) => {
    // 1. Complete standard admin login
    await loginPage.gotoHomePage();
    await loginPage.clickTopLoginButton();
    await loginPage.login(testData.adminUsername, testData.adminPassword);

    // 2. Open the Enroll User Popup Modals
    await welcomePage.selectFromUserDropdown('Admin Panel');
    await adminPage.verifyAdminDashboardVisible();
    await adminPage.clickEnrollments();
    await adminPage.clickEnrollUserButton();
    await adminPage.waitForEnrollPopup();

    // Select a course using your Page Object Method
    await adminPage.selectCourse();

    //  Click the green "Enroll User" submit button inside the popup
    const enrollSubmitButton = page.locator('button', { hasText: /^Enroll User$/ }).first();
    await enrollSubmitButton.click();

    //  Verify the validation error message appears at the back
    await adminPage.verifyPleaseSelectUserError();

    //  Assert that the popup modal window did NOT disappear (it stays visible)
    const modalWindow = page.locator('text=Enroll Users').first();
    await expect(modalWindow).toBeVisible();

    // Pause for 5 seconds so you can visually watch the red banner stay on screen!
    await page.waitForTimeout(5000);

    // Clean up: Close modal
    const cancelButton = page.locator('button').filter({ hasText: /cancel|close/i }).first();
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
    }
  });

});