import { Page, expect }
from '@playwright/test';

// ======================================================
// BASE PAGE
// ======================================================

export class BasePage {

    constructor( protected page: Page) {

    }

    async clickElement(locator: string) {

        // Wait for element to be visible
        await this.page.locator(locator)
            .waitFor({
                state: 'visible'
            });

        // Click element
        await this.page.locator(locator)
            .click();
    }

    // ==================================================
    // ENTER TEXT METHOD
    // ==================================================

    async enterText(
        locator: string,
        text: string
    ) {

        // Wait for textbox
        await this.page.locator(locator)
            .waitFor({
                state: 'visible'
            });

        // Enter text
        await this.page.locator(locator)
            .fill(text);
    }

    // ==================================================
    // GET TEXT METHOD
    // ==================================================

    async getText(locator: string) {

        // Wait for element
        await this.page.locator(locator)
            .waitFor({
                state: 'visible'
            });

        // Return text
        return await this.page
            .locator(locator)
            .textContent();
    }

    // ==================================================
    // VERIFY ELEMENT VISIBLE
    // ==================================================

    async verifyElementVisible(
        locator: string
    ) {

        // Verify element visible
        await expect(
            this.page.locator(locator)
        ).toBeVisible();
    }

    // ==================================================
    // VERIFY URL
    // ==================================================

    async verifyUrl(urlText: string) {

        // Verify URL contains text
        await expect(this.page)
            .toHaveURL(
                new RegExp(urlText)
            );
    }
}