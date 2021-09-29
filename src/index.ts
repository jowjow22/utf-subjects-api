import puppeteer from 'puppeteer';
import { username, password } from './secrets';

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const SleepFor = async (page: puppeteer.Page, min: number, max: number) => {
  const sleepDuration = randomIntFromInterval(min, max);
  console.log('waiting for', sleepDuration / 1000, 'seconds');
  await page.waitForTimeout(sleepDuration);
};

const authenticate = async (page: puppeteer.Page) => {
  try {
    const userNameInputs = await page.$x(`//input[@placeholder="Usuário"]`);
    if (userNameInputs.length > 0) {
      await userNameInputs[0].focus();
      await page.keyboard.type(username);
    }
    const passwordInputs = await page.$x(`//input[@placeholder="Senha"]`);
    if (passwordInputs.length > 0) {
      await passwordInputs[0].focus();
      await page.keyboard.type(password);
    }
    const loginButton = await page.$x(`//button[@label="Login"]`);
    if (loginButton.length > 0) {
      await loginButton[0].click();
    }
  } catch (e) {
    console.log('Error in Auth:', e);
  }
};

const navigate = async (page: puppeteer.Page) => {
  try {
    const subjecsButton = await page.$x(
      `//td[text()='Disciplinas Matriculadas']`,
    );
    if (subjecsButton.length > 0) {
      console.log('clicou');
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
    await authenticate(page);
    await SleepFor(page, 1000, 200);
    await navigate(page);
  } catch (e) {
    console.log(e);
  }
};

(async () => {
  await browserSetup();
})();
