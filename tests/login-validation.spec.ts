import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Validation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
      waitUntil: 'domcontentloaded'
    });

    // Ensure login form is ready
    await page.waitForSelector('input[name="username"]', { timeout: 15000 });
  });

  test('Login with invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'InvalidUser');
    await page.fill('input[name="password"]', 'InvalidPass');
    await page.click('button[type="submit"]');

    // Instead of networkidle, wait for error alert
    await expect(page.locator('.oxd-alert')).toBeVisible({ timeout: 10000 });

    await expect(page).toHaveURL(/auth\/login/);
  });

  test('Login with empty username and password', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('.oxd-input-field-error-message'))
      .toHaveCount(2);
  });

  test('Valid login and logout', async ({ page }) => {
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Wait for dashboard URL
    await expect(page).toHaveURL(/dashboard/, { timeout: 20000 });

    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

    // Logout
    await page.locator('.oxd-userdropdown-tab').click();

    await page.getByText('Logout').click();

    await expect(page).toHaveURL(/auth\/login/, { timeout: 10000 });
  });

});
