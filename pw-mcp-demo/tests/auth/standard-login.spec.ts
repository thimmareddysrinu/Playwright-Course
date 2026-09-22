import { test, expect } from '../../src/fixtures/base';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/login.json';

test.describe('Standard user login', () => {
  test('reaches the products page with shopping controls @smoke @critical @regression', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    const loadedInventory = await login.loginAs(users.standard.username, users.standard.password);

    await expect(loadedInventory.inventoryHeader).toBeVisible();
    await expect(inventory.cartButton).toBeVisible();
    await expect(inventory.addToCartButtons.first()).toBeVisible();
  });
});