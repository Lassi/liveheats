import { test, expect } from '@playwright/test';

test('Teacher can complete a race', async ({ page }) => {
  // Create a new race
  await page.goto('http://localhost:3000/races/new');

  const studentInput = page.getByRole('textbox');
  const addStudentButton = page.getByRole('button', { name: 'Add student' });

  const studentNames = ['Naomi', 'Lassi', 'Zenja'];

  for (const studentName of studentNames) {
    await studentInput.fill(studentName);
    await addStudentButton.click();
  }

  await page.getByRole('button', { name: 'Create race' }).click();

  // RacePage
  await expect(page.getByRole('listitem')).toHaveText(studentNames);

  await page.fill('input#Naomi-0', '2', { force: true });
  await page.fill('input#Lassi-1', '3', { force: true });
  await page.fill('input#Zenja-2', '1', { force: true });

  const completeButton = page.getByRole('button', { name: 'Complete race' });
  await completeButton.click();

  await expect(page.getByRole('textbox')).not.toBeVisible();

  await page.waitForTimeout(10000);
});
