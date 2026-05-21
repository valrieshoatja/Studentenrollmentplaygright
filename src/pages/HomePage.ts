import { BasePage }
from './BasePage';

import { expect }
from '@playwright/test';

export class HomePage extends BasePage {
async clickLoginButton() {
    await this.clickElement('button.user-pill');
  }

  async verifyOnHomePage() {

    // Verify home button element is visible to the user
    await expect(

      this.page.getByRole('button', {
        name: 'Home'
      })

    ).toBeVisible({ timeout: 10000 });
  }
  

}