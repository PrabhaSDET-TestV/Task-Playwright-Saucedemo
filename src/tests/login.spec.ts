import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../../test-data/login-data.json';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login(loginData.validCredentials);
        const title = await loginPage.getCurrentPageTitle();
        expect(title).toBe('Swag Labs');
    });

    test('should show error message with invalid credentials', async () => {
        await loginPage.login(loginData.invalidCredentials);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
    });

    test('should show error message for locked out user', async () => {
        await loginPage.login(loginData.lockedOutUser);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('locked out');
    });
}); 