const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,  // set to false if you want to see the browser
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // Replace this URL with the actual Google Books search URL for a book
    const searchQuery = 'ABC Book	3 - 6 years	Dr. Seuss	Random House, NY';
    const searchUrl = `https://www.google.com/search?sca_esv=2ac96987daa6f6a8&sxsrf=AE3TifMGCBGkTdzSDxVEc1iu5gtEoa1Upg:1754545994863&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnMEIxC4WQfoNDH7FwchyAayyomVtyMIlwCjX48LT0TrXSPt4cTMBEUhFjb1npEwd-pp_aRD8Rutuf9gzrxQ1X-rVJ_s4WfJYQGlZ0dCz-NY6HC6esLApXMfMf9GTGGaIaQORmX6cA&q=${encodeURIComponent(searchQuery)}&sa=X&ved=2ahUKEwiahpCWgfiOAxU-UGwGHU-8BoQQtKgLegQIEhAB&biw=1920&bih=517&dpr=1`;

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
