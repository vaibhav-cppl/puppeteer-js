const puppeteer = require('puppeteer');
const { URL } = require('url');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  const bookQuery = 'ABC Book 3 - 6 years Dr. Seuss Random House NY';
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(bookQuery)}&tbm=isch`;

  await page.goto(searchUrl, { waitUntil: 'networkidle2' });

  // Wait for image links to load
  await page.waitForSelector('#search a[href*="/imgres?"]');

  // Extract the first imgurl
  const fullImageUrl = await page.evaluate(() => {
    const anchor = document.querySelector('#search a[href*="/imgres?"]');
    if (!anchor) return null;

    const href = anchor.getAttribute('href');
    const params = new URLSearchParams(href.split('?')[1]);
    const imgurl = params.get('imgurl');

    if (!imgurl) return null;

    // Clean: remove after common extensions
    const match = imgurl.match(/(https?:\/\/.*?\.(jpg|jpeg|png|webp|gif))/i);
    return match ? match[1] : imgurl;
  });

  console.log('Image URL:', fullImageUrl);

  await browser.close();
})();
