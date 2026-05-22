import { Page, expect }
from '@playwright/test';

export class WelcomePage {

  constructor(private page: Page) {}
async verifyWelcomeMessage(
    username: string
  ) {

    // Creates a case-insensitive regular expression from whatever string is passed in
    const nameRegex = new RegExp(`Welcome back,\\s*${username}`, 'i');
    await expect(
      this.page.getByRole('heading', { name: nameRegex })
    ).toBeVisible({ timeout: 5000 });
  }
  async verifyEnrolledCoursesVisible(
    count: string
  ) {

    await expect(
      this.page.locator('div', { hasText: 'Enrolled Courses' })
        .locator('div')
        .filter({ hasText: count })
        .first()
    ).toBeVisible({ timeout: 5000 });
  
  }
   async clickUserDropdown() {
    // Looks for a button class that contains the text 'Menu' explicitly 
    const dropdownButton = this.page.locator('button.user-pill', { hasText: 'Menu' });
    
    // Ensure it's ready, then execute click
    await dropdownButton.waitFor({ state: 'visible', timeout: 5000 });
    await dropdownButton.click({ force: true }); 
  }

  // REUSABLE MENU SELECTION ACTION
  async selectFromUserDropdown(itemName: string) {
    if (itemName === 'Logout') {
      this.page.once('dialog', async dialog => {
        await dialog.accept();
      });
    }

    // Opens the dropdown menu panel
    await this.clickUserDropdown();

    // Locates the visible menu window context
    const dropdownContainer = this.page.locator('.nav-dropdown.open');
    await dropdownContainer.waitFor({ state: 'visible', timeout: 5000 });

    // Finds the matching element matching your instruction text string
    const targetButton = dropdownContainer
      .locator('button')
      .filter({ has: this.page.locator('span', { hasText: new RegExp(`^${itemName}$`, 'i') }) });

    await targetButton.click();
  }
}