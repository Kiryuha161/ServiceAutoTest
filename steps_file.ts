import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
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
    loginWithCookies: async function (loginUrl: string, authorizedUser: IAuthorizedUser) {
      await this.enterToAccount(loginUrl, authorizedUser);
      const cookieString = await this.getCookieString();

      return cookieString;
    },
    /**
     * Возвращает строку с куки
     * @returns возвращает строку с куки
     */
    getCookieString: async function() {
      const cookies = await this.grabCookie();
      const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

      return cookieString;
    },
    /**
     * Вход в аккаунт без собирания куков авторизации для простых тестов, где куки не требуются
     * @param loginUrl адрес страницы аутентификации
     * @param authorizedUser данные пользователя для авторизации
     */
    enterToAccount: async function (loginUrl: string, authorizedUser: IAuthorizedUser) {
      await this.amOnPage(loginUrl);
      await this.wait(15);
      await this.fillField('UserName', authorizedUser.username);
      await this.fillField('Password', authorizedUser.password);
      await this.click('Войти в профиль');
    },
    /**
     * Клик на кнопку "Новый лот"
     */
    clickOnNewLot: async function () {
      this.click('Новый лот');
      this.wait(3);
      this.see('РАЗМЕСТИТЬ НОВЫЙ ЛОТ');
    },
    /**
     * Клик по select
     * @param propertyClass класс свойства, которое выбирается (категория, подкатегория)
     * @param valueId id свойства, которого мы ищем
     * @param isCategory (не обязательно, по умолчанию true) выбор категории или другого свойства
     */
    clickOnSelect: async function (propertyClass, valueId, isCategory = true) { //на деве и локалке добавил классы, по которым можно обратиться для select
      let selectElement;
      if (isCategory) {
        selectElement = `.nice-select.custom-select.wide.form-control.app-form-control.mb-3.mb-md-4.${propertyClass}`;
      } else {
        selectElement = `.nice-select.custom-select.wide.form-control.app-form-control.mb-4.${propertyClass}`;
      }

      const listOptions = `${selectElement}.open .list`;
      const choicedOption = `${listOptions} .option[data-value="${valueId}"]`;
      this.wait(3);

      this.click(selectElement);
      this.waitForElement(listOptions, 10);
      this.click(choicedOption);
    },
    /**
     * Клик по checkbox
     * @param attributeId значение атрибута, согласно которого, происходит выбор категории
     */
    clickOnCheckbox: async function (attributeId) {
      const checkboxElement = `input[id="${attributeId}"]`
      this.checkOption(checkboxElement);
    },
    /**
     * Заполнение комбобокса 
     * @param value 
     * @param cityId 
     */
    fillComboBox: async function (value, cityId) { //на локалке добавил классы для обращения к элементам
      this.wait(3);
      const comboBox = '.address';
      const dropdownItem = `.city${cityId}`;
      console.log(`element ${comboBox}`);
      this.fillField(comboBox, value);
      this.wait(10);
      this.click(dropdownItem);
    }
  });
}