import { JSDOM } from 'jsdom';
import { delay } from './delay.js';
import { URLMAIN, URLRENDER } from '../constants.js';

export async function getInfoAboutResource(page) {
  try {
    const resource = {};
    const [city, allObjectResourceByCity] = await getInfoFromAside(page);
    const resourceFromMap = await getInfoFromMap(page);
    for (const [oldKey, value] of Object.entries(resourceFromMap)) {
      const newKey = allObjectResourceByCity[oldKey];
      resource[newKey] = value;
    }
    return { city, resource };
  } catch (error) {
    throw error;
  }
}

async function getInfoFromAside(page) {
  try {
    await page.goto(URLMAIN);
    await delay(1000);
    const data = await page.content();
    const { document } = new JSDOM(data).window;
    const city = document.querySelector('#information-div u').textContent;
    const allObjectResourceByCity = [
      ...document.querySelectorAll('a.obj_link tr td:last-child img'),
    ].reduce((acc, i) => {
      acc[i.title] = i.src.match(/\/([^\/.]+)\.[^.]+$/)[1];
      return acc;
    }, {});
    return [city, allObjectResourceByCity];
  } catch (error) {
    throw error;
  }
}
async function getInfoFromMap(page) {
  try {
    await page.goto(URLRENDER);
    await delay(1000);
    const data = await page.content();
    const { document } = new JSDOM(data).window;
    const resourceFromMap = [...document.querySelectorAll('#container>div')]
      .filter(el => el.querySelector('div.object_resources') !== null)
      .reduce((acc, el) => {
        const amount = el.textContent.trim();
        const typeResource = el.nextSibling.textContent
          .match(/generate_tooltip\(([^)]+)\)/)[1]
          .split(',')[2]
          .replaceAll("'", '')
          .trim();
        acc[typeResource] = amount;
        return acc;
      }, {});
    return resourceFromMap;
  } catch (error) {
    throw error;
  }
}
