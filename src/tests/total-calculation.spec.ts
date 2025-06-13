import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import loginData from '../../test-data/login-data.json';
import totalData from '../../test-data/total-calculation-data.json';

test.describe('Total Calculation Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        // Login first
        await loginPage.goto();
        await loginPage.login(loginData.validCredentials);
    });

    test('should calculate correct total for all products', async ({ page }) => {
        // Add all products to cart
        for (const product of totalData.products) {
            await inventoryPage.addToCart(product.name);
        }

        // Verify cart count
        await inventoryPage.verifyCartCount(totalData.products.length.toString());

        // Click on cart icon
        await inventoryPage.clickCartIcon();

        // Get all product names from cart
        const cartProductNames = await cartPage.getCartItemNames();

        // Verify all products are in cart
        for (const product of totalData.products) {
            expect(cartProductNames).toContain(product.name);
        }

        // Calculate total
        const calculatedTotal = await cartPage.calculateTotal();

        // Verify total matches expected amount
        expect(calculatedTotal).toBe(totalData.expectedTotal);

        // Take screenshot of cart page with all items
        await page.screenshot({ path: totalData.screenshots.cartWithAllItems });
    });
}); 