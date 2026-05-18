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
}