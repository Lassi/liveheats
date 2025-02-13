import { test, expect } from '@playwright/test';

test('Teacher can create a new race', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // RootPage
  expect(page.getByRole('heading', 'All your races')).toBeVisible();

  await page.getByRole('link', { name: 'Create new race' }).click();

  // NewRacePage
  expect(page.getByRole('heading', 'Create a new race')).toBeVisible();

  const studentInput = page.getByRole('textbox');
  const studentButton = page.getByRole('button', { name: 'Add student' });

  const studentNames = ['Mike Bottle', 'Tommy Pickle', 'Chucky Something', 'Coco Apple'];

  for (const studentName of studentNames) {
    await studentInput.fill(studentName);
    await studentButton.click();
  }

  await page.getByRole('button', { name: 'Create' }).click();

  // RacePage
  await page.waitForURL('**/races/fakeId');

  expect(page.getByRole('heading', 'Temporary race page')).toBeVisible();

  const studentListItems = page.getByRole('listitem');

  studentListItems.forEach((studentListItem, index) => {
    expect(studentListItem).toHaveText(studentNames.at(index));
  });
});
