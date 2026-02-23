import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Validation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
  });

  test('Login with invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'InvalidUser');
    await page.fill('input[name="password"]', 'InvalidPass');
    await page.click('button[type="submit"]');

    // Wait for login request to complete
    await page.waitForLoadState('networkidle');

    // Assert user is still on login page (login failed)
    await expect(page).toHaveURL(/auth\/login/);

    // Optional: check error alert visible
    await expect(page.locator('.oxd-alert')).toBeVisible();
  });

  test('Login with empty username and password', async ({ page }) => {
    await page.click('button[type="submit"]');

    // Validate both required field messages appear
    await expect(page.locator('.oxd-input-field-error-message')).toHaveCount(2);
  });
test('Valid login and logout', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

 
  // Now assert dashboard
  await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });
  await expect(page.getByRole('heading', { name: 'Dashboard' }))
    .toBeVisible();

  // Logout
  await page.locator('.oxd-userdropdown-tab').click();

  await Promise.all([
    page.waitForURL(/auth\/login/),
   page.getByText('Logout').click(),
  ]);
});
});