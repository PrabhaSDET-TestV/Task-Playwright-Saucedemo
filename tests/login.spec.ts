import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { validCredentials, invalidCredentials, lockedOutUser } from '../test-data/login-data';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login(validCredentials);
        const title = await loginPage.getCurrentPageTitle();
        expect(title).toBe('Swag Labs');
    });

    test('should show error message with invalid credentials', async () => {
        await loginPage.login(invalidCredentials);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
    });

    test('should show error message for locked out user', async () => {
        await loginPage.login(lockedOutUser);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('locked out');
    });
}); 