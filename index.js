const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,  // set to false if you want to see the browser
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // Replace this URL with the actual Google Books search URL for a book
    const searchQuery = 'ABC Book	3 - 6 years	Dr. Seuss	Random House, NY';
    const searchUrl = `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(searchQuery)}`;

    await page.goto(searchUrl, { waitUntil: 'networkidle2' });

    // Wait for the #search element
    await page.waitForSelector('#search');

    const imageUrl = await page.evaluate(() => {
        const searchContainer = document.querySelector('#search');
        const firstImg = searchContainer.querySelector('img');
        return firstImg ? firstImg.src : null;
    });
   console.log('Search URL:', searchUrl);
    console.log('First image URL:', imageUrl);

    await browser.close();
})();
