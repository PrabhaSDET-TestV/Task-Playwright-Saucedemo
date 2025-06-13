import { Page, expect } from '@playwright/test';

export class InventoryPage {
    private page: Page;
    private productClass = '.inventory_item';
    private cartIcon = '#shopping_cart_container';
    private cartCountSelector = `${this.cartIcon} span`;

    constructor(page: Page) {
        this.page = page;
    }

    async addToCart(productName: string) {
        await this.page
            .locator(this.productClass)
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async clickCartIcon() {
        await this.page.locator(this.cartIcon).click();
    }

    async verifyCartCount(expectedCount: string) {
        const countText = await this.page.locator(this.cartCountSelector);
        await expect(countText).toHaveText(expectedCount);
        console.log(`Added counts are matched.`);
    }

    async getProductName(productName: string) {
        return await this.page
            .locator(this.productClass)
            .filter({ hasText: productName })
            .locator('.inventory_item_name')
            .textContent();
    }
} 