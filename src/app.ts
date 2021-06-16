import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.skyroom.online/users/login/referrer/736b79726f6f6d2f7374617473');

  await page.type('#login_username', 'lingoberry');
  await page.type('#login_password', 'L1ng0Berry');

  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('.form-group > .zt-button'), // Clicking the link will indirectly cause a navigation
  ]);

  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('#menu_option_files > a'), // Clicking the link will indirectly cause a navigation
  ]);

  page.click('#btn_select_file > button');

  await page.waitForSelector('#btn_select_file > .dropdown-menu', {
    visible: true,
  });

  page.click('#btn_select_file > .dropdown-menu > li:nth-child(1) > a');

  await page.screenshot({ path: 'example.png' });

  await page.waitForSelector('#wait', {
    visible: true,
  });

  await browser.close();

  console.log('Done');
})();
