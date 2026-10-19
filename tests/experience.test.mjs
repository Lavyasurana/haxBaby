import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium, firefox, webkit } from 'playwright';
import { existsSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';

const url = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const engine = process.env.TEST_BROWSER || 'chromium';
const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath = process.env.CHROME_PATH || (engine === 'chromium' && existsSync(macChrome) ? macChrome : undefined);
const browser = await ({chromium, firefox, webkit})[engine].launch({ executablePath, headless: true });
after(() => browser.close());
async function pageFor(options = {}) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('dreamos-visited', 'true'));
  await page.goto(url);
  return { context, page };
}
test('dream, delivery, story, and keyboard focus', async () => {
  const { context, page } = await pageFor();
  try {
    const start = page.getByRole('button', {name: /Make a dream/}).first();
    await start.click();
    const dialog = page.getByRole('dialog', {name:'Dream Builder'});
    await dialog.getByRole('button', {name:/Cloud Sea/}).click();
    await dialog.getByRole('button', {name:/Curious/}).click();
    await dialog.getByRole('button', {name:/Make my dream/}).click();
    await dialog.getByRole('heading', {name:'Curious in the Cloud Sea'}).waitFor();
    await dialog.getByRole('button', {name:/Send a dream/}).click();
    const map = page.getByRole('dialog', {name:'Delivery Map'});
    await map.getByText('Curious in the Cloud Sea').waitFor();
    await map.getByRole('button', {name:/Send a dream/}).click();
    await map.getByText(/Delivered to Cloud Cottage/).waitFor({timeout:5000});
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog').count(), 0);
    await page.waitForFunction(el => document.activeElement === el, await start.elementHandle());
    assert.equal(await start.evaluate(el => el === document.activeElement), true);
    await page.getByRole('button', {name:/Read my story/}).click();
    await page.getByRole('dialog', {name:'Storybook'}).getByRole('button', {name:/Next page/}).click();
    await page.getByRole('heading', {name:'The Broken Dream Machine'}).waitFor();
  } finally { await context.close(); }
});
test('blocked storage does not interrupt dreams or wishes', async () => {
  const context = await browser.newContext({ reducedMotion:'reduce' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    for (const method of ['getItem','setItem','removeItem']) Storage.prototype[method] = () => { throw new DOMException('Blocked', 'SecurityError'); };
  });
  try {
    await page.goto(url);
    await page.getByRole('button', {name:/Make a dream/}).first().click();
    const dream = page.getByRole('dialog', {name:'Dream Builder'});
    await dream.getByRole('button', {name:/Make my dream/}).click();
    await dream.getByText(/could not be saved on this device/).waitFor();
    await dream.getByRole('button', {name:/Send a dream/}).click();
    await page.getByRole('dialog', {name:'Delivery Map'}).getByText('Cozy in the Moon Garden').waitFor();
    await page.getByRole('button', {name:/Guestbook/}).first().click();
    const guestbook = page.getByRole('dialog', {name:'Guestbook'});
    await guestbook.getByLabel('YOUR WISH').fill('A gentle dream');
    await guestbook.getByRole('button', {name:/Save my wish/}).click();
    await guestbook.getByText('A gentle dream').waitFor();
    await guestbook.getByText(/could not be saved on this device/).waitFor();
  } finally { await context.close(); }
});
for (const [name, viewport] of [['desktop',{width:1440,height:900}], ['mobile',{width:390,height:844}]]) {
  test(`${name}: no serious automated accessibility violations`, async () => {
    const {context,page} = await pageFor({viewport, reducedMotion:'reduce'});
    try {
      await page.getByRole('button', {name:/Make a dream/}).first().click();
      const results = await new AxeBuilder({page}).analyze();
      const issues = results.violations.filter(v=>['serious','critical'].includes(v.impact));
      assert.deepEqual(issues.map(v=>({id:v.id, impact:v.impact, nodes:v.nodes.map(n=>n.target)})), []);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'no horizontal page overflow');
    } finally { await context.close(); }
  });
}
