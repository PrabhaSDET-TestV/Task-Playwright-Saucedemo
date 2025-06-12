import { Page } from '@playwright/test';
import { LoginCredentials } from '../types';

export class LoginPage {
    private readonly page: Page;
    private readonly selectors = {
        usernameField: '#user-name',
        passwordField: '#password',
        loginButton: '#login-button',
        errorMessage: '[data-test="error"]'
    };

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterUsername(username: string): Promise<void> {
        await this.page.locator(this.selectors.usernameField).fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.locator(this.selectors.passwordField).fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.page.locator(this.selectors.loginButton).click();
    }

    async login(credentials: LoginCredentials): Promise<void> {
        await this.enterUsername(credentials.username);
        await this.enterPassword(credentials.password);
        await this.clickLogin();
    }

    async getErrorMessage(): Promise<string> {
        return await this.page.locator(this.selectors.errorMessage).textContent() || '';
    }

    async getCurrentPageTitle(): Promise<string> {
        return await this.page.title();
    }
} 