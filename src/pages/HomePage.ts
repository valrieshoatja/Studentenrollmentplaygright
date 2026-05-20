import { BasePage }
from './BasePage';

import { expect }
from '@playwright/test';

// ======================================================
// HOME PAGE (PUBLIC LANDING AREA)
// ======================================================

export class HomePage extends BasePage {

  // ==================================================
  // VERIFY HOMEPAGE NAVIGATION ACTIVE STATUS
  // ==================================================

  async verifyOnHomePage() {

    // Verify home button element is visible to the user
    await expect(

      this.page.getByRole('button', {
        name: 'Home'
      })

    ).toBeVisible({ timeout: 10000 });
  }
}