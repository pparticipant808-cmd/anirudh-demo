import { test, expect } from '@playwright/test';

test('OrangeHRM Login Page Test', async ({ page }) => {
  
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();

});

