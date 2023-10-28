import { test, expect } from '@playwright/test';

const URL = 'http://localhost:3000';

test('has title', async ({ page, baseURL }) => {
  await page.goto(URL);

  await page.getByTitle('ed1').fill('Plain Text');

  // Expect a title "to contain" a substring.
  await expect(page.getByTestId('text')).toHaveText('Plain Text');
});
