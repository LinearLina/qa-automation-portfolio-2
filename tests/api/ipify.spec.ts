import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.ipify.org';

test.describe('ipify API', () => {
  test('returns a valid IP address in plain text', async ({ request }) => {
    const response = await request.get(`${BASE_URL}?format=json`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.ip).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
  });

  test('returns JSON when format=json is specified', async ({ request }) => {
    const response = await request.get(`${BASE_URL}?format=json`);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('response time is reasonable', async ({ request }) => {
    const start = Date.now();
    await request.get(`${BASE_URL}?format=json`);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000);
  });
});