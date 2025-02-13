import { test, expect } from '@playwright/test';

test('Teacher can create a new race', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // RootPage
  await expect(page.getByRole('heading', 'All your races')).toBeVisible();

  await page.getByRole('link', { name: 'Create new race' }).click();

  // NewRacePage
  await expect(page.getByRole('heading', 'Create a new race')).toBeVisible();

  const studentInput = page.getByRole('textbox');
  const addStudentButton = page.getByRole('button', { name: 'Add student' });

  const studentNames = ['Mike Bottle', 'Tommy Pickle', 'Chucky Something', 'Coco Apple'];

  for (const studentName of studentNames) {
    await studentInput.fill(studentName);
    await addStudentButton.click();
  }

  await page.getByRole('button', { name: 'Create race' }).click();

  // RacePage
  await page.waitForURL('**/races/*');

  await expect(page.getByRole('heading', 'Temporary race page')).toBeVisible();

  await expect(page.getByRole('listitem')).toHaveText(studentNames);
});

test('Teacher cannot create a race with less than 2 students', async ({ page }) => {

  await page.goto('http://localhost:3000/races/new');

  const studentName = 'Lone Student';
  const studentInput = page.getByRole('textbox');
  const addStudentButton = page.getByRole('button', { name: 'Add student' });

  await studentInput.fill(studentName);
  await expect(addStudentButton).toBeEnabled();
  await addStudentButton.click();

  await expect(page.getByRole('button', { name: 'Create race' })).toBeDisabled();
});
