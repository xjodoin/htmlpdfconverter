import puppeteer from "puppeteer";
import {printPDF} from "../../src/pdf";

let browserWSEndpoint = null;

async function getWSEndpoint() {
    if (!browserWSEndpoint) {
        let options;
        // when use in docker we're using the installed chrome
        if (process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === 'true') {
            options = {
                executablePath: 'google-chrome-stable',
                headless: true,
                args: [
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            }
        } else {
            options = {
                headless: true,
                args: [
                    '--disable-dev-shm-usage'
                ]
            }
        }
        const browser = await puppeteer.launch(options);
        return browser.wsEndpoint();
    } else {
        return browserWSEndpoint;
    }
}


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const id = await printPDF(req.body, await getWSEndpoint())
        res.status(201).json({pdf: `pdf/${id}.pdf`})
    } else {
        res.status(400).json({message: 'Invalid request'})
    }
}