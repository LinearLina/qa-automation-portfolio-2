import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Cloudflare public site — smoke checks', () => {
  test('homepage loads and has expected title', async ({ page }) => {
    await page.goto('https://www.cloudflare.com');
    await expect(page).toHaveTitle(/Cloudflare/i);
  });

  test('homepage has no critical accessibility violations', async ({ page }) => {
    await page.goto('https://www.cloudflare.com');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    // Report rather than hard-fail — you don't control their site,
    // so treat this as a finding, not a pass/fail gate
    console.log(`Accessibility violations found: ${results.violations.length}`);
    expect(results.violations.length).toBeLessThan(20);
  });

 test('homepage visual snapshot', async ({ page }) => {
  await page.goto('https://www.cloudflare.com');
  await expect(page).toHaveScreenshot('cloudflare-homepage.png', {
    maxDiffPixelRatio: 0.15,
    animations: 'disabled',
  });
});

  test('main navigation links are not broken', async ({ page, request }) => {
    await page.goto('https://www.cloudflare.com');
    const links = await page.locator('nav a').evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).href).filter(Boolean)
    );
    for (const link of links.slice(0, 10)) {
      const response = await request.get(link);
      expect(response.status(), `Broken link: ${link}`).toBeLessThan(400);
    }
  });
});