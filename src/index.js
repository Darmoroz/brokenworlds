import puppeteer from 'puppeteer';
import chalk from 'chalk';
import fs from 'fs';

import { delay } from './utils/delay.js';
import { formatDate } from './utils/formatDate.js';
import { getInfoAboutResource } from './utils/getInfoAboutResource.js';
import { loginInGame } from './utils/loginInGame.js';
import { PORTALS } from './constants.js';
import { saveToJSONFile } from './utils/saveDataToFile.js';

const savePath = `../result/`;
const saveFileName = `${formatDate(new Date())}.json`;
const result = [];

async function main() {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1920, height: 1080 },
  });

  try {
    const page = await browser.newPage();
    await loginInGame(page);
    await delay(2000);

    for (let i = 0; i < PORTALS.length; i++) {
      const resourceInfo = await getInfoAboutResource(page);
      result.push(resourceInfo);
      console.log(chalk.green(resourceInfo.city), 'was added successfully');
      const step = await page.$(PORTALS[i]);
      if (step) {
        await step.click();
        await delay(13000);
      }
    }

    await page.close();
    await saveToJSONFile(savePath, saveFileName, result);
  } catch (error) {
    console.log(chalk.red(error));
  }
  browser.close();
}

main();
