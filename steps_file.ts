import { setHeadlessWhen } from '@codeceptjs/configure';
import { json } from 'stream/consumers';
import { IAuthorizedUser } from './interfaces';
//const assert = require('node:assert');
// in this file you can append custom step methods to 'I' object

export = function () {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    /**
     * Входит на страницу и собирает куки авторизации с полученной страницы для тестов запросов, где требуются куки, после чего переводит это в строку и возвращает
     * @param loginUrl адрес страницы аутентификации
     * @param authorizedUser данные пользователя для авторизации
     * @returns возвращает строку с куками авторизации
     */
    loginWithCookies: async function name(loginUrl: string, authorizedUser: IAuthorizedUser) {
      await this.enterToAccount(loginUrl, authorizedUser);

      const cookies = await this.grabCookie();
      const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

      return cookieString;
    },

    /**
     * Вход в аккаунт без собирания куков авторизации для простых тестов, где куки не требуются
     * @param loginUrl адрес страницы аутентификации
     * @param authorizedUser данные пользователя для авторизации
     */
    enterToAccount: async function name(loginUrl: string, authorizedUser: IAuthorizedUser) {
      await this.amOnPage(loginUrl);
      await this.fillField('UserName', authorizedUser.username);
      await this.fillField('Password', authorizedUser.password);
      await this.click('Войти в профиль');
    }
  });
}
