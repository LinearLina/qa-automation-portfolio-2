import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('products page matches visual baseline', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveScreenshot('products-page.png');
});