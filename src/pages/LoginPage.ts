import { Page } from '@playwright/test';

export class LoginPage {

  constructor(private page: Page) {}

  async gotoHomePage() {

    // Open website
    await this.page.goto(
      'https://ndosisimplifiedautomation.vercel.app/'
    );
  }

  async clickTopLoginButton() {

    // Click top Login button
    await this.page.locator('button.user-pill').click();
  }

  async enterEmail(email: string) {

    await this.page.locator('#login-email').fill(email);
  }

  async enterPassword(password: string) {

    await this.page.locator('#login-password').fill(password);
  }

  async clickLoginButton() {

    await this.page.getByRole('button', {
      name: 'Login'
    }).click();
  }

  async login(email: string, password: string) {

    await this.enterEmail(email);

    await this.enterPassword(password);

    await this.clickLoginButton();
  }
}