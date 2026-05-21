import { Page ,expect} from '@playwright/test';

export class LoginPage {

  constructor(private page: Page) {}
  readonly userPillButton = 'button.user-pill';

  async gotoHomePage() {

    await this.page.goto(
      'https://ndosisimplifiedautomation.vercel.app/'
    );
  }

  async clickTopLoginButton() {

    await this.page.locator(this.userPillButton).click();
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
  // VERIFY LOGIN ERROR,negetive test
  
async verifyLoginErrorMessage() {
    // 1. Target generic UI error/alert containers on the screen regardless of the specific text inside
    const errorContainer = this.page.locator('[class*="error" i], [class*="alert" i], [role="alert"], .toast-message').first();
    
    // 2. Fallback text locator checking for broader keyword combinations (including "wrong" or "match")
    const fallbackText = this.page.getByText(/invalid|incorrect|failed|error|wrong|match|denied/i).first();

    // 3. Race them: Wait for either a dedicated error block OR a dynamic text block to appear
    await Promise.race([
      errorContainer.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
      fallbackText.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {})
    ]);

    // 4. Assert that at least one recognizable error signal is present on the layout
    const isContainerVisible = await errorContainer.isVisible();
    const isTextVisible = await fallbackText.isVisible();

    if (!isContainerVisible && !isTextVisible) {
      throw new Error(' Negative Test Failed: Could not detect any visible error notification elements or text words on the screen after entering invalid credentials.');
    }
    
    console.log('Successfully validated login restriction alert message.');
  }

}