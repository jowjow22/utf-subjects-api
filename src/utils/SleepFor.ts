import puppeteer from 'puppeteer';
import RandomIntFromInterval from './RandomIntFromInterval';

async function SleepFor(page: puppeteer.Page, min: number, max: number) {
  const sleepDuration = RandomIntFromInterval(min, max);
  console.log('waiting for', sleepDuration / 1000, 'seconds');
  await page.waitForTimeout(sleepDuration);
}

export default SleepFor;
