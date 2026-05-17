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
}