import puppeteer from 'puppeteer';
import { username, password } from '../secrets';

async function Authenticate(page: puppeteer.Page): Promise<void> {
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
}

export default Authenticate;
