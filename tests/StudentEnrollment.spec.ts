import { test } 
from '../src/fixtures/customFixture';
import { testData }
from '../src/data/testData';

test('Login Test', async ({ loginPage, welcomePage, adminPage, homePage, page }) => {

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
  await welcomePage.verifyWelcomeMessage(testData.AdminUserName);
  

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
 await welcomePage.verifyWelcomeMessage(testData.AdminUserName);


  //  CLICK LOGOUT TO COMPLETE THE CYCLE
  await welcomePage
  .selectFromUserDropdown('Logout');
  await homePage
    .verifyOnHomePage();

    // ==========================================
  // 🌟 NEW STUDENT LOGIN AGENT LOOP
  // ==========================================

  // Click the public login button using the newly added action
  await homePage
    .clickLoginButton();

  // Wait for login payload text entry field container to be visible again
  await page.locator('#login-email').waitFor({ state: 'visible' });

  // Log back into the site application space using the unique student record data keys
  await loginPage.login(
    testData.studentUsername,
    testData.studentPassword
  );

  // Confirm the dashboard now properly greets the newly logged-in student user context
  await welcomePage.verifyEnrolledCoursesVisible('1');
  });