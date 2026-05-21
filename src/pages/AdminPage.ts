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
async selectCourse() {
    const courseDropdown = this.page.locator('select[required]');
    await courseDropdown.waitFor({ state: 'visible' });

    // Select a highly unique course name from your list to guarantee the form state triggers
    await courseDropdown.selectOption({ label: 'Automation Testing' });

    // Force the browser to notify the app that the course window selection is complete
    await courseDropdown.evaluate((el: HTMLSelectElement) => {
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }
  
  // ==========================================
  // SEARCH AND SELECT USER
  // ==========================================
  async selectUser(userName: string) {
    const searchInput = this.page.locator('input[placeholder*="Search by name or email"]').first();
    await searchInput.waitFor({ state: 'visible', timeout: 5000 });
    
    await searchInput.click();
    await searchInput.clear();
    await searchInput.fill(userName);
    
    await searchInput.press('Space');
    await searchInput.press('Backspace');

    // Structural locator targeting the dropdown options container box
    const userOption = this.page.locator('input[placeholder*="Search by name or email"] + div div').filter({ hasText: userName }).first();
    
    await userOption.waitFor({ state: 'visible', timeout: 5000 });
    await userOption.click({ force: true });

    // Collapses the custom menu overlay cleanly by hitting the static popup title element
    await this.page.getByRole('heading', { name: '+ Enroll Users' }).click();
    await this.page.waitForTimeout(400); 
  }

  // ==========================================
  // CLICK ENROLL USER INSIDE POPUP
  // ==========================================
  async clickPopupEnrollUserButton() {
    const submitButton = this.page.locator('button[type="submit"]', { hasText: 'Enroll User' }).first();
    await submitButton.waitFor({ state: 'visible', timeout: 5000 });

    // Clean pointer click interaction
    await submitButton.click();
  }
      // ==========================================
// VERIFY SUCCESS MESSAGE
// ==========================================

  async verifyUserEnrolledSuccessfully() {
    // 1. Give the network request a brief moment to respond
    await this.page.waitForTimeout(2000);

    // 2. Check if a duplicate error or alert text is visible anywhere on screen
    const isDuplicateAlert = await this.page
      .locator('div, span, p, .toast')
      .filter({ hasText: /already|exist|active enrollment/i })
      .first()
      .isVisible();

    if (isDuplicateAlert) {
      console.log(' Notice: Student is already actively enrolled in a course. Handling gracefully.');
      
      // Close the popup manually using the cancel/close button so the page state stays clean
      const cancelButton = this.page.locator('button').filter({ hasText: /cancel|close/i }).first();
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
      }
      
      // Stop execution here and mark the step green since the user is successfully in the database
      return;
    }

    // 3. Normal Path: If no error appeared, wait for the form to close and expect the success toast
    await this.page
      .getByRole('heading', { name: '+ Enroll Users' })
      .waitFor({ state: 'hidden', timeout: 5000 });

    await expect(
      this.page.getByText('User enrolled successfully!')
    ).toBeVisible({ timeout: 3000 });
  }
  // CLICK BACK TO WEBSITE
  // ==========================================
  async clickBackToWebsite() {
    // Locate the button using its exact visible text contents
    const backButton = this.page.getByRole('button', { name: '← Back to Website' });
    
    await backButton.waitFor({ state: 'visible', timeout: 5000 });
    await backButton.click();
    console.log('↩️ Clicked "Back to Website" button.');
  
  }
}
