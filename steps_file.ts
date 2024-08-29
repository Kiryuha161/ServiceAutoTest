import { setHeadlessWhen } from '@codeceptjs/configure';
import { json } from 'stream/consumers';
//const assert = require('node:assert');
// in this file you can append custom step methods to 'I' object

export = function () {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    /**
     * Входит на страницу и собирает куки авторизации с полученной страницы для тестов запросов, где требуются куки, после чего переводит это в строку и возвращает
     * @param url адрес сайта
     * @param username логин
     * @param password пароль
     * @returns возвращает строку с куками авторизации
     */
    loginWithCookies: async function name(url: string, username: string, password: string) {
      await this.enterToAccount(url, username, password);

      const cookies = await this.grabCookie();
      const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

      return cookieString;
    },

    /**
     * Вход в аккаунт без собирания куков авторизации для простых тестов, где куки не требуются
     * @param url адрес сайта
     * @param username логин
     * @param password пароль
     */
    enterToAccount: async function name(url: string, username: string, password: string) {
      await this.amOnPage(url);
      await this.fillField('UserName', username);
      await this.fillField('Password', password);
      await this.click('Войти');
    }
  });
}
