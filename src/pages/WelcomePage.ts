import { Page, expect }
from '@playwright/test';

export class WelcomePage {

  constructor(private page: Page) {}

  async verifyWelcomeMessage(
    username: string
  ) {

    await expect(

      this.page.getByRole('heading', {
        name: `Welcome back, ${username}!`
      })

    ).toBeVisible({ timeout: 15000 });
  }
     async clickUserDropdown() {

    await this.page
      .locator('button.user-pill')
      .click();
  }

  async clickAdminPanel() {

    await this.page
      .locator('.nav-dropdown.open')
      .waitFor({
        state: 'visible'
      });

    await this.page
      .getByRole('button', {
        name: 'Admin Panel'
      })
      .click();
  }
}
