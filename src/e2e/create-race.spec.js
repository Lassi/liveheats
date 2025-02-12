import { test, expect } from '@playwright/test';

test('Teacher can create a new race', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  expect(page.getByRole('heading', 'All your races')).toBeVisible();

  await page.getByRole('link', { name: 'Create new race' }).click();

  expect(page.getByRole('heading', 'Create a new race')).toBeVisible();

  await page.getByRole('button', { name: 'Create' }).click();

  expect(page.getByRole('heading', 'Temporary race page')).toBeVisible();
});
