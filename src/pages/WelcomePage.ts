import { Page, expect }
from '@playwright/test';

export class WelcomePage {

  constructor(private page: Page) {}
async verifyWelcomeMessage(
    username: string
  ) {

    // Creates a case-insensitive regular expression from whatever string is passed in
    const nameRegex = new RegExp(`Welcome back, ${username}!`, 'i');

    await expect(
      this.page.getByRole('heading', { name: nameRegex })
    ).toBeVisible({ timeout: 15000 });
  }
  async verifyEnrolledCoursesVisible(
    count: string
  ) {

    await expect(
      this.page.locator('div', { hasText: 'Enrolled Courses' })
        .locator('div')
        .filter({ hasText: count })
        .first()
    ).toBeVisible({ timeout: 15000 });
  
  }
     async clickUserDropdown() {

    await this.page
      .locator('button.user-pill')
      .click();
  }

  // REUSABLE MENU SELECTION ACTION
  // ==========================================
  async selectFromUserDropdown(
    itemName: string
  ) {
    if (itemName === 'Logout') {
      this.page.once('dialog', async dialog => {
        // This automatically clicks 'OK' when the confirmation popup shows up
        await dialog.accept();
      });
    }
    // 1. Open the dropdown menu panel view layout block
    await this.clickUserDropdown();

    // 2. Wait for the state menu structure container overlay to render completely
    await this.page
      .locator('.nav-dropdown.open')
      .waitFor({
        state: 'visible'
      });

    // 3. Select and trigger pointer events on the target option based on passed text name
    await this.page
      .getByRole('button', {
        name: itemName
      })
      .click();
  }

}
