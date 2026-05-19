import { Page, expect }
from '@playwright/test';

export class AdminPage {

  constructor(private page: Page) {}

  // ==========================================
  // VERIFY ADMIN DASHBOARD
  // ==========================================

  async verifyAdminDashboardVisible() {

    // Wait for admin dashboard
    await this.page
      .locator('.admin-dashboard')
      .waitFor({
        state: 'visible'
      });

    // Verify heading is visible
    await expect(

      this.page.getByRole('heading', {
        name: ' Admin Dashboard'
      })
         ).toBeVisible();
 
        }
  // ==========================================
  // CLICK ENROLLMENTS
  // ==========================================

  async clickEnrollments() {

    await this.page
      .getByRole('button', {
        name: 'Enrollments'
      })
      .click();
  }

  // ==========================================
  // CLICK ENROLL USER BUTTON
  // ==========================================

  async clickEnrollUserButton() {

    await this.page
      .getByRole('button', {
        name: '+ Enroll User'
      })
      .click();

  }
  // ==========================================
  // WAIT FOR ENROLL POPUP
  // ==========================================

  async waitForEnrollPopup() {

    await this.page
      .getByRole('heading', {
        name: '+ Enroll Users'
      })
      .waitFor({
        state: 'visible'
      });
  }

  // ==========================================
  // SELECT COURSE
  // ==========================================

  async selectCourse(
    courseName: string
  ) {

    await this.page
      .locator('select[required]')
      .selectOption({
        label: courseName
      });
  }
   // ==========================================
  // SEARCH AND SELECT USER
  // ==========================================

 async selectUser(userName: string) {

  await this.page
    .getByText(userName, { exact: true })
    .click();
}

  // ==========================================
  // CLICK ENROLL USER INSIDE POPUP
  // ==========================================

  async clickPopupEnrollUserButton() {

    await this.page
      .locator('button[type="submit"]')
      .click();
    }
      // ==========================================
// VERIFY SUCCESS MESSAGE
// ==========================================

async verifyUserEnrolledSuccessfully() {

  // Verify popup disappears
  await this.page
    .getByRole('heading', {
      name: '+ Enroll Users'
    })
    .waitFor({
      state: 'hidden'
    });

  // Verify success message appears
  await expect(
    this.page.getByText(
      'User enrolled successfully!'
    )
  ).toBeVisible();

  }

}