import puppeteer from 'puppeteer';

(async () => {
  const options = { width: 1466, height: 1000 };

  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: [`--window-size=${options.width},${options.height}`],
  });

  const page = await browser.newPage();
  await page.setViewport(options);

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

  /* Need To Get Type Of File
      1. zip, pdf, ppt, pptx, odp, png, jpg, jpeg, gif
      2. mp3, wav
      3. mp4, webm, ogg
      4. other
  */

  await page.click('#btn_select_file > .dropdown-menu > li:nth-child(1) > a');
  await page.waitForSelector('#workspace', {
    visible: true,
  });

  const elementHandle = await page.$('#btn_upload > input[type=file]');
  await elementHandle?.uploadFile('/home/f4rh4d/Pictures/Screenshot from 2021-08-24 15-02-07.png');

  //! Didnt Find The Proper El To W8 For
  // You Can W8 For Input Then Set The Title Too
  // await page.waitForSelector('#div_title > .col-sm-3 .control-label', {
  //   visible: true,
  // });
  // await page.waitForSelector('#tab_properties > #file_name');

  // await page.$eval('#div_title > input[name=title]', (el: any) => (el.value = 'Adenosine triphosphate'));

  // workspace panel_file tabs

  await page.click('#files > #workspace > #panel_file > #tabs > li:nth-child(2) > a'); // Clicking the link will indirectly cause a navigation

  // page.click('#workspace > #panel_file > #tabs > a[href=#tab_channels');
  // page.waitForNavigation();
  //? Selecting The Room

  await page.waitForSelector('#tab_channels', {
    visible: true,
  });
  await page.waitForSelector('#tab_channels > div > #channels', {
    visible: true,
  });

  await page.screenshot({ path: 'example.png' });

  await page.evaluate(() =>
    Array.from(
      (document as any).querySelector('#tab_channels > div > #channels').children,
      (checkbox: HTMLElement) => checkbox.children[0],
    ).forEach((label: Element) => {
      if ((label as HTMLElement).innerText === 'تست بات اسکای روم') {
        const el = document.querySelectorAll(
          `input[type="checkbox"][value="${(label as HTMLElement).children[0].getAttribute('value')}"]`,
        )[0];
        el.setAttribute('checked', '');
      }
    }),
  );
  //? Selecting The Room

  await page.waitForTimeout(500);

  await page.click('#btn_save');
  // await page.screenshot({ path: 'example.png' });

  // await page.waitForSelector('#wait', {
  //   visible: true,
  // });

  // await browser.close();
})();
