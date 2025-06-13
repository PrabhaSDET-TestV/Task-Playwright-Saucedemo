import { Page } from '@playwright/test';

export class CartPage {
    private page: Page;
    private checkoutButton = '#checkout';
    private removeButton = '#remove-sauce-labs-backpack';
    private continueShoppingButton = '#continue-shopping';
    private cartItemName = '.inventory_item_name';
    private cartItemPrice = '.inventory_item_price';

    constructor(page: Page) {
        this.page = page;
    }

    async clickCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    async clickRemove() {
        await this.page.locator(this.removeButton).click();
    }

    async clickContinueShopping() {
        await this.page.locator(this.continueShoppingButton).click();
    }

    async getCartItemNames(): Promise<string[]> {
        const nameElements = await this.page.locator(this.cartItemName).all();
        const names = await Promise.all(nameElements.map(element => element.textContent()));
        return names.filter((name): name is string => name !== null);
    }

    async getAllCartItemPrices(): Promise<string[]> {
        const priceElements = await this.page.locator(this.cartItemPrice).all();
        const prices = await Promise.all(priceElements.map(element => element.textContent()));
        return prices.filter((price): price is string => price !== null);
    }

    async calculateTotal(): Promise<string> {
        const prices = await this.getAllCartItemPrices();
        const total = prices.reduce((sum, price) => {
            const numericPrice = parseFloat(price.replace('$', ''));
            return sum + numericPrice;
        }, 0);
        return `$${total.toFixed(2)}`;
    }
} 