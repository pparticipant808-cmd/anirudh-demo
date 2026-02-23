import { test, expect } from '@playwright/test';

test('Login with invalid credentials', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  await page.fill('input[name="username"]', 'wrongUser');
  await page.fill('input[name="password"]', 'wrongPass');
  await page.click('button[type="submit"]');

await expect(page.getByText('Invalid credentials')).toBeVisible();
});