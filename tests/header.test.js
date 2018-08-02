const puppeteer = require('puppeteer');

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium'
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  //await browser.close();
});

test('the header has the correct text', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test.only('When signed in, shows logout button', async () => {
  //eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWI1YmY0MTlhODQ2YjU2OTc0MjU0MzIzIn19
  //0jJIV71PZUnYiQ-jUqOTi_Uyx5w
  const id = '5b5bf419a846b56974254323';

  const Buffer = require('safe-buffer').Buffer;
  const sessionObject = {
    passport: {
      user: id
    }
  };

  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    'base64'
  );

  const Keygrip = require('keygrip');
  const keys = require('../config/keys');

  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign('session=' + sessionString); // they deciede having session= for no reason
  await page.setCookie({ name: 'session', value: sessionString });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.goto('localhost:3000');
});
