import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly inventoryHeader: Locator;
  readonly cartButton: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryHeader = page.getByRole('banner');
    this.cartButton = page.getByRole('button', { name: 'Cart, empty', exact: true });
    this.addToCartButtons = page.getByRole('button', { name: "Add to cart"});
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.waitForReady();
  }
}