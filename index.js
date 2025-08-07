const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const query = "The Alchemist Paulo Coelho book cover";
  const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;

  await page.goto(url, { waitUntil: 'networkidle2' });

  const img = await page.evaluate(() => {
    const image = document.querySelector('img');
    return image?.src || null;
  });

  console.log("Image URL:", img);
  await browser.close();
})();
