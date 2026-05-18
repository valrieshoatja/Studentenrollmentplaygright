import { Page, expect }
from '@playwright/test';

// ======================================================
// BASE PAGE
// ======================================================

export class BasePage {

    page: Page;

    constructor(page: Page) {

        // Store browser page
        this.page = page;
    }

    // ==================================================
    // CLICK METHOD
    // ==================================================

    async clickElement(locator: string) {

        // Wait for element
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
}