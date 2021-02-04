import puppeteer from 'puppeteer';
import {v4 as uuidv4} from 'uuid';

export async function printPDF(body, browserWSEndpoint) {
    const browser = await puppeteer.connect({browserWSEndpoint});
    const page = await browser.newPage();

    await page.goto(body.url, {waitUntil: "networkidle2"});
    await page.addStyleTag({
        content: `
            html {
              -webkit-print-color-adjust: exact !important;
              -webkit-filter: opacity(1) !important;
            }
          `
    });

    const options = {
        format: 'letter',
        ...body
    };

    const id = uuidv4()

    options.path = `pdf/${id}.pdf`;

    await page.pdf(options);

    await page.close();
    return id;
}
