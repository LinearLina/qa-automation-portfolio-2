import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator('.btn_inventory');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }
}