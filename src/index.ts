import puppeteer from 'puppeteer';
import Authenticate from './middlewares/Authenticate';
import SleepFor from './utils/SleepFor';

const navigate = async (page: puppeteer.Page) => {
  try {
    const subjecsButton = await page.$x(
      `//td[text()='Disciplinas Matriculadas']`,
    );
    if (subjecsButton.length > 0) {
      await subjecsButton[0].click();
    }
  } catch (e) {
    console.log(e);
  }
};

const browserSetup = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const URL =
      'https://sistemas2.utfpr.edu.br/login?returnUrl=%2Fdpls%2Fsistema%2Faluno06%2Fmpmenu.inicio';
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });
    await page.goto(URL, { waitUntil: 'networkidle2' });
    await SleepFor(page, 1000, 200);
    await Authenticate(page);
    await SleepFor(page, 1000, 200);
    await navigate(page);
  } catch (e) {
    console.log(e);
  }
};

(async () => {
  await browserSetup();
})();
