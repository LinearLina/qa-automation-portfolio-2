import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('adding an item updates the cart badge', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addFirstItemToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

// Data-driven test: same test logic, multiple inputs
const sortOptions = ['lohi', 'hilo', 'az', 'za'];
for (const option of sortOptions) {
  test(`can sort products by ${option}`, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy(option);
    // Confirms the dropdown accepted the value without erroring
    await expect(inventoryPage.sortDropdown).toHaveValue(option);
  });
}