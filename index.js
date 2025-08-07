const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();

  const bookQuery = 'ABC Book 3 - 6 years Dr. Seuss Random House NY';
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(bookQuery)}&tbm=isch`;

  await page.goto(searchUrl, { waitUntil: 'networkidle2' });

  // Wait for image grid to appear
  await page.waitForSelector('a[href*="imgurl="]');

  const imageUrl = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href*="imgurl="]'));
    for (const anchor of anchors) {
      const href = anchor.getAttribute('href');
      if (!href) continue;

      const params = new URLSearchParams(href.split('?')[1]);
      const imgurl = params.get('imgurl');

      if (imgurl && /\.(jpg|jpeg|png|webp|gif)/i.test(imgurl)) {
        return imgurl.match(/(https?:\/\/.*?\.(jpg|jpeg|png|webp|gif))/i)?.[1];
      }
    }
    return null;
  });

  console.log('Image URL:', imageUrl || 'No image found');

  await browser.close();
})();
