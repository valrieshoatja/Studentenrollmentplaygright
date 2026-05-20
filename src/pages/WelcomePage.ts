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

  // REUSABLE MENU SELECTION ACTION
  // ==========================================
  async selectFromUserDropdown(
    itemName: string
  ) {

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
