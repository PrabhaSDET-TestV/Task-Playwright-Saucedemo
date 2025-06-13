import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import loginData from '../../test-data/login-data.json';
import cartData from '../../test-data/cart-data.json';

test.describe('Cart Tests', () => {
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

    test('should add product to cart and verify it appears in cart', async ({ page }) => {
        const productName = cartData.products.backpack.name;
        
        // Get the product name from inventory page
        const inventoryProductName = await inventoryPage.getProductName(productName);
        
        // Add product to cart
        await inventoryPage.addToCart(productName);
        
        // Verify cart count
        await inventoryPage.verifyCartCount('1');
        
        // Take screenshot of inventory page
        await page.screenshot({ path: cartData.screenshots.inventory });
        
        // Click on cart icon
        await inventoryPage.clickCartIcon();
        
        // Get the product names from cart
        const cartProductNames = await cartPage.getCartItemNames();
        
        // Verify product name is in cart
        expect(cartProductNames).toContain(inventoryProductName);
        
        // Take screenshot of cart page
        await page.screenshot({ path: cartData.screenshots.cart });
    });

    test('should add multiple products to cart', async ({ page }) => {
        // Add backpack to cart
        await inventoryPage.addToCart(cartData.products.backpack.name);
        
        // Add bike light to cart
        await inventoryPage.addToCart(cartData.products.bikeLight.name);
        
        // Verify cart count
        await inventoryPage.verifyCartCount('2');
        
        // Click on cart icon
        await inventoryPage.clickCartIcon();
        
        // Get all product names from cart
        const cartProductNames = await cartPage.getCartItemNames();
        
        // Verify both products are in cart
        expect(cartProductNames).toContain(cartData.products.backpack.name);
        expect(cartProductNames).toContain(cartData.products.bikeLight.name);
    });

    test('should calculate correct total for all products', async ({ page }) => {
        // Add all products to cart
        await inventoryPage.addToCart(cartData.products.backpack.name);
        await inventoryPage.addToCart(cartData.products.bikeLight.name);
        await inventoryPage.addToCart(cartData.products.boltTShirt.name);
        await inventoryPage.addToCart(cartData.products.fleeceJacket.name);
        await inventoryPage.addToCart(cartData.products.onesie.name);
        await inventoryPage.addToCart(cartData.products.redTShirt.name);

        // Verify cart count
        await inventoryPage.verifyCartCount('6');

        // Click on cart icon
        await inventoryPage.clickCartIcon();

        // Get all product names from cart
        const cartProductNames = await cartPage.getCartItemNames();

        // Verify all products are in cart
        expect(cartProductNames).toContain(cartData.products.backpack.name);
        expect(cartProductNames).toContain(cartData.products.bikeLight.name);
        expect(cartProductNames).toContain(cartData.products.boltTShirt.name);
        expect(cartProductNames).toContain(cartData.products.fleeceJacket.name);
        expect(cartProductNames).toContain(cartData.products.onesie.name);
        expect(cartProductNames).toContain(cartData.products.redTShirt.name);

        // Calculate total
        const calculatedTotal = await cartPage.calculateTotal();

        // Verify total matches expected amount
        expect(calculatedTotal).toBe(cartData.expectedTotal);

        // Take screenshot of cart page with all items
        await page.screenshot({ path: 'screenshots/cart-with-all-items.png' });
    });
}); 