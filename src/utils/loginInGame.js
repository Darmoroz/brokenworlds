import { delay } from './delay.js';
import { NICK, PASS, URL } from '../constants.js';

export async function loginInGame(page) {
  try {
    await page.goto(URL);
    await delay(1000);

    const loginBtn = await page.$('#log_in');
    if (loginBtn) {
      await loginBtn.click();
      await delay(1000);
    }

    const wrapperFormEl = await page.$('#dialog1');
    const isShowLoginForm = await page.evaluate(el => {
      return el.style.display === 'block';
    }, wrapperFormEl);

    if (isShowLoginForm) {
      await page.type('#nick', NICK, { delay: 100 });
      await page.type('#pass', PASS, { delay: 100 });
      const enterBtn = await page.$('input[type="submit"]');
      await enterBtn.click();
    }
  } catch (error) {
    throw error;
  }
}
