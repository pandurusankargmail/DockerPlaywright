// spec: specs/plan.md
// seed: tests/seed.spec.ts
import { throttle } from '../utils/throttle';
import { test, expect } from '@playwright/test';

test.describe('Login and Manage Account', () => {
  test('Login and Change Account Details 7', async ({ page }) => {
    test.slow(); // Mark the test as slow to allow for longer execution time
    // 1. Navigate to the application
    await page.goto('https://demo-saas.bugbug.io');

    // 2. Login with email and password
    await page.locator('header').getByRole('link', { name: 'Log in' }).click();
await page.getByRole('textbox', { name: 'Email' }).fill('demosaas@yopmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('test1234');
    const loginBtn = await page.locator("fieldset").getByRole('button', { name: 'Log in' })
    while(await loginBtn.isVisible() && await loginBtn.isEnabled()) {
      await loginBtn.click();
      await page.waitForTimeout(1000);
    }
    await throttle(500);
    // Wait for login to complete
    await page.waitForURL(/.*\/lennox.*/);
    await page.getByTestId('user-settings').hover();

    // 3. & 4. Click on right bottom menu -> Manage Account
    await page.getByRole('link').filter({ hasText: 'Manage account' }).click();

    // Wait for Manage Account page to load
    await page.waitForURL(/.*\/manage-account/);

    // 5. & 6. Change first name and last name
    await page.getByRole('textbox', { name: 'First name' }).fill('Test1');
    await page.getByRole('textbox', { name: 'Last name' }).fill('Test2');

    // 7. Save changes
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify account details are successfully updated
    await expect(page.getByText('Successfully updated your account details!')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First name' })).toHaveValue('Test1');
    await expect(page.getByRole('textbox', { name: 'Last name' })).toHaveValue('Test2');
  });
});
