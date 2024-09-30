import { lot } from '../lot';
import { IAuthorizedUser, ICreateOrderService, IFlags, IOrderServiceModel } from '../interfaces';
import { get, request } from "http";
import { url } from 'inspector';

const config = require('../codecept.conf').config;
const assert = require('assert');
const util = require('util'); //используется для логов

//#region Поля тестов
const loginUrl: string = '/Account/Login';
const devSites: Array<string> = config.sites;
const localSites: Array<string> = config.localhostSites;
const productSites: Array<string> = config.productSites;

const authorizedUser: IAuthorizedUser = {
    //username: 'param0n61@yandex.ru',
    username: 'kiryuha161@gmail.com',
    password: '25031993Pko'
}

const defaultFlags: IFlags = {
    isChecking: true,
    isApiResult: true,
    isPost: false
}

const orderServiceModel: IOrderServiceModel = {
    AccountId: 1793,
    Price: 4000
}

const createOrderService: ICreateOrderService = {
    OrderServiceModel: orderServiceModel,
    IdServices: [3]
}
//#endregion

//#region Функции тестов
/**
 * Проверка результатов теста апи c возвращаемым объектом ApiResult
 * @param response ответ сервера
 */
const checkApiResult = async (response) => {
    await assert.equal(response.status, 200, "Статус - не ок");
    await assert.strictEqual(typeof response.data, 'object', "Данные должны быть объектом");
    await assert.strictEqual(response.data.Success, true, "Success должно быть true");
    await assert.ok(response.data.UpdatedItem, "Должно быть свойство 'UpdatedItem'");
}

/**
 * Проверка результатов теста апи, который не возвращает объект ApiResult
 * @param response ответ сервера
 */
const checkWithoutApiResult = async (response) => {
    await assert.equal(response.status, 200, "Статус - не ок");
    await assert.strictEqual(typeof response.data, 'object', "Данные должны быть объектом");
}

/**
 * Получает ответ сервера с куками от get-запроса
 * @param I объект теста
 * @param authorizeUrl адрес авторизации
 * @param requestUrl адрес запроса
 * @param username логин пользователя
 * @param password пароль пользователя
 * @returns ответ сервера
 */
const getResponseWithCookie = async (I: CodeceptJS.I, authorizeUrl: string, requestUrl: string, authorizedUser: IAuthorizedUser) => {
    const cookieString = await I.loginWithCookies(authorizeUrl, authorizedUser);
    const response = await I.sendGetRequest(requestUrl, { Cookie: cookieString });

    return response;
}

/**
 * Получает ответ сервера с куками от post-запроса
 * @param I объект теста
 * @param authorizeUrl адрес авторизации
 * @param requestUrl адрес запроса
 * @param authorizeUser данные пользователя для авторизации
 * @param parameter параметр запроса
 * @returns ответ сервера
 */
const getPostResponseWithCookie = async (I: CodeceptJS.I, authorizeUrl: string, requestUrl: string, authorizedUser: IAuthorizedUser, parameter: object) => {
    const cookieString = await I.loginWithCookies(authorizeUrl, authorizedUser);
    const headers = {
        'Cookie': cookieString,
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify(parameter);
    const response = await I.sendPostRequest(requestUrl, body, headers);

    return response;
}

/**
 * Добавляет заголовок запроса
 * @param I объект теста
 * @param property свойство заголовка запроса
 * @param value значение свойства заголовка запроса
 */
const addHeader = async (I: CodeceptJS.I, property: string, value: any) => {
    const requestHeaders = {
        [property]: value
    };

    I.haveRequestHeaders(requestHeaders);
}

/**
 * Выполняет указанный запрос. Если указано, что функция должна проверять результат, то выполняется проверка теста, если нет, то возвращается ответ
 * @param I объект теста
 * @param site домен, к которому идёт запрос
 * @param requestUrl адрес запроса, добавляющийся к домену
 * @param isChecking (не обязательно, по умолчанию true) проверять ли ответ сервера или нет (в случаях когда результат используется в последующем запросе сценария)
 * @param isApiResult (не обязательно, по умолчанию true) возвращает ли сервер объект ApiResult
 * @param isPost (не обязательно, по умолчанию false) отправлен post-запрос или нет (get-запрос)
 * @param headers (не обязательно, по умолчанию пустой объект) заголовки запроса
 * @param parameter (не обязательно, по умолчанию пустой объект) параметры, передающиеся в post-запрос, если это isPost === true
 * @returns в случае, если проверка ответа сервера не требуется, возвращает ответ
 */
const performRequest = async (I: CodeceptJS.I, site: string, requestUrl: string, flags: IFlags = defaultFlags, headers: object = {}, parameter: object = {}) => {
    for (const [property, value] of Object.entries(headers)) {
        await addHeader(I, property, value)
    }

    let response;
    if (!flags.isPost) {
        response = await getResponseWithCookie(I, `${site}${loginUrl}`, `${site}${requestUrl}`, authorizedUser);
    } else {
        response = await getPostResponseWithCookie(I, `${site}${loginUrl}`, `${site}${requestUrl}`, authorizedUser, parameter)
    }

    if (flags.isChecking) {
        if (flags.isApiResult) {
            await checkApiResult(response);
        } else {
            await checkWithoutApiResult(response);
        }
    } else {
        return response;
    }
}

const performPostRequest = async (I: CodeceptJS.I, site: string, requestUrl: string, flags: IFlags = defaultFlags, headers: object = {}, parameter: object = {}) => {
    for (const [property, value] of Object.entries(headers)) {
        await addHeader(I, property, value)
    }

    console.log(util.inspect(headers));

    const body = JSON.stringify(parameter);
    const response = I.sendPostRequest(`${site}${requestUrl}`, body, headers);

    if (flags.isChecking) {
        if (flags.isApiResult) {
            await checkApiResult(response);
        } else {
            await checkWithoutApiResult(response);
        }
    } else {
        return response;
    }
}

/**
 * Возвращает объект со свойствами, определяющими будет ли проводится проверка при выполнении запроса и содержит ли ответ объект ApiResult
 * @param isChecking будет ли проводиться проверка
 * @param isApiResult содержит ли ответ объект ApiResult
 * @param isPost отправлен post-запрос или нет (get-запрос)
 * @returns объект, со свойствами isChecking, isApiResult, isPost
 */
const getFlags = (isChecking: boolean, isApiResult: boolean, isPost: boolean): IFlags => {
    const flags: IFlags = {
        isChecking: isChecking,
        isApiResult: isApiResult,
        isPost: isPost
    }

    return flags;
}

/**
 * Возвращает токен верификации
 * @param I объект теста
 * @param site домен, к которому идёт запрос
 * @returns токен авторизации
 */
const GetAntiForgeryToken = async (I: CodeceptJS.I, site: string) => {
    const requestTokenUrl = '/Auth/GetAntiForgeryToken';
    const token = await I.sendGetRequest(`${site}${requestTokenUrl}`);

    return token.data;
}

/**
 * Производит авторизацию по post-запросу
 * @param I объект теста
 * @param site домен, к которому идёт запрос
 * @param token токен верификации,
 * @param isChecking проверять ли результат апи
 * @returns в случае, если выполняется проверка функция ничего не возвращает, если проверка не должна выполняться, 
 * то возвращает строку с куки авторизации, которую можно использовать для дальнейших действий на странице
 */
const AuthorizeByRequest = async (I, site, tokenData, isChecking = false) => {
    const requestLoginUrl = '/Auth/Login';
    const loginFlags: IFlags = getFlags(isChecking, false, true);
    const cookieString = await I.getCookieString();
    const headers = {
        'Content-Type': 'application/json',
        'Cookie': cookieString,
        'RequestVerificationToken': tokenData
    };
    const body = {
        UserName: authorizedUser.username,
        Password: authorizedUser.password,
        RememberMe: true
    };
    if (isChecking) {
        await performPostRequest(I, site, requestLoginUrl, loginFlags, headers, body);
    } else {
        const response = await performPostRequest(I, site, requestLoginUrl, loginFlags, headers, body);
        console.log(util.inspect(response));
    }

}
//#endregion 

//#region UI-тесты
Feature('Открытие страницы лота');
devSites.forEach(page => {
    Scenario(`openLotPage ${page}`, ({ I }) => {
        I.amOnPage(page);
        I.see("Вход");
    });
});

Feature('Авторизация пользователя и выход из аккаунта');
devSites.forEach(site => {
    Scenario(`authorizeUserAndQuit ${site}`, async ({ I }) => {
        await I.enterToAccount(`${site}${loginUrl}`, authorizedUser);
        await I.wait(1);
        await I.click('a[title="Выйти"]');
        await I.click("Выйти");
        await I.see("Присоединиться");
    });
});

Feature('Авторизация пользователя и покупка лота'); //для арта тест закончился
for (let i = 0; i < localSites.length; i++) {
    if (i !== 2) { // не перебирает Viomitra.China, так как там нет страниц с возможностью "Купить сейчас"
        const site = localSites[i];
        const pages = [
            "/zemelnyj-uastok-po-adresu-g-moskva-frunzenska-naberena-30-s5-6_1025",
            "/irisy-4030sm_2471",
            ''
        ];

        Scenario.only(`authorizeUserAndBuyLot ${site}`, async ({ I }) => {
            await I.enterToAccount(`${site}${loginUrl}`, authorizedUser);

            await I.amOnPage(`${site}${pages[i]}`);
            await I.wait(5);
            await I.click('Купить сейчас');
            await I.wait(5);
            await I.see('Оплатить');
            await I.click('Оплатить');
            await I.wait(5);
            await I.click('Оплатить');
            await I.wait(5);

            // Переключение на новую вкладку
            await I.switchToNextTab();
            await I.seeElement('#lotId')
        });
    }
}

Feature('UI-тест создания лота');
for (let i = 0; i < localSites.length; i++) {
    const site = localSites[i];
    const categoryId = 2;
    const subcategoriesId = 147;
    //const lengthTrade = 3;
    const isCategory = true;
    const restartRequireValue = 0; //не перевыставляется
    const depositRequireValue = 0; //без депозита
    const thirdLevelCategoryId = 181;
    const address = "г Ростов-на-Дону";
    const cityId = 421965;
    const buildSquadName = 'Filter323';
    const buildSquadValue = 1000;
    const areaSquadName = 'Filter285';
    const areaSquadValue = 2000;

    Scenario.skip(`createLot_UI ${site}`, async ({ I }) => {
        await I.enterToAccount(`${site}${loginUrl}`, authorizedUser);
        I.wait(3);
        I.clickOnNewLot();

        I.fillField('Name', 'Автоматизированное создание лота через UI-тест');
        I.clickOnSelect('category', categoryId);
        I.clickOnSelect('subcategory', subcategoriesId);
        I.clickOnCheckbox(`ThirdLevelCategory${thirdLevelCategoryId}`);
        I.fillComboBox(address, cityId);
        I.fillField(buildSquadName, buildSquadValue);
        I.fillField(areaSquadName, areaSquadValue);
        //I.clickOnSelect(`length-trade`, lengthTrade, !isCategory);
        I.clickOnSelect(`restart`, restartRequireValue, !isCategory);
        I.fillField(`BasePrice`, 30000000);
        I.fillField('Information', 'Этот лот создан с помощью автоматизированного тестирования через UI');
        I.clickOnSelect(`deposit`, depositRequireValue, !isCategory);
        I.click('Выставить лот');
        I.wait(60);
        I.see('ПОЗДРАВЛЯЕМ!');
    })
}

Feature("Создание похожего лота");
for (let i = 0; i < localSites.length; i++) {
    const site = localSites[i];
    const localLotTitle = 'ТЕСТ Кадастрового номера с юр действиями';
    Scenario.skip(`CopyLot ${site}`, async ({ I }) => {
        await I.enterToAccount(`${site}${loginUrl}`, authorizedUser);
        I.wait(3);
        I.click('a[title="Моя активность"]');
        I.click(localLotTitle);
        I.wait(3);
        I.click('span[class="current"]');
        I.wait(3);
        I.click('ul.list li[data-value="1"]');
        I.wait(10);
        I.click('Выставить лот');
        I.wait(60);
        I.see('ПОЗДРАВЛЯЕМ!');
    })
}
//#endregion

//#region Тесты GET-запросов
Feature('Запрос на домен автотестов');
Scenario.skip('autotestRequest', ({ I }) => {
    I.amOnPage('https://autotest.viomitra.ru/?q=&m=any');
I.haveRequestHeaders({
    'Origin': 'https://autotest.viomitra.ru:2999'
});
})

Feature('GET-запрос на страницу лота, проверка на статус');
config.sites.forEach(site => {
    Scenario(`tradeLotView ${site}`, async ({ I }) => {
        const response = await I.sendGetRequest(`${site}/TradeLot/View/223`);
        assert.equal(response.status, 200, 'Статус - не ок');
    });
});

Feature('Получение всех сервисов');
for (let i = 0; i < devSites.length; i++) {
    const site = devSites[i];
    Scenario(`getAllServices ${site}`, async ({ I }) => {
        const requestUrl = '/ServiceApi/GetAllServices';
        await performRequest(I, site, requestUrl);
    })
}

Feature('Получение сервиса по id');
for (let i = 0; i < devSites.length; i++) {
    const site = devSites[i];
    Scenario(`getServiceByIdFromHeader ${site}`, async ({ I }) => {
        const requestUrl = '/ServiceApi/GetServiceById';
        const flags = getFlags(true, true, false);
        await performRequest(I, site, requestUrl, flags, { 'id': 2 });
    })
}


Feature('Получение сервиса по имени (Бизнес)');
for (let i = 0; i < devSites.length; i++) {
    const site = devSites[i];
    Scenario(`getServiceByName ${site}`, async ({ I }) => {
        const requestUrl = '/ServiceApi/GetServiceByName?name=Бизнес';
        await performRequest(I, site, requestUrl);
    })
}

Feature('Получение данных заказа услуг по orderId');
for (let i = 0; i < devSites.length; i++) {
    const site = devSites[i];
    Scenario(`getOrderServiceDetailsById ${site}`, async ({ I }) => {
        const requestUrl = '/OrderServiceApi/GetOrderServiceDetailsById';
        const flags = getFlags(true, true, false);
        await performRequest(I, site, requestUrl, flags, { 'orderId': 13 });
    })
}

Feature('Получение данных заказа услуг по accountId');
for (let i = 0; i < devSites.length; i++) {
    const site = devSites[i];
    Scenario(`GetOrderServicesByAccountId ${site}`, async ({ I }) => {
        const requestUrl = '/OrderServiceApi/GetOrderServicesByAccountId';
        const flags = getFlags(true, true, false);
        await performRequest(I, site, requestUrl, flags, { 'accountId': 1751 });
    });
} // Надо дописать апи, для продолжения сценариев с OrderServiceApi

Feature('Получение документа');
const accountIds = [1802, 1771, 1801]
const documentTypeIds = [39, 20, 34] //реалти, арт, китай
for (let i = 0; i < devSites.length; i++) {
    const accountId = accountIds[i];
    const documentTypeId = documentTypeIds[i];
    const site = devSites[i];

    Scenario(`getDocument ${site}`, async ({ I }) => {
        const requestUrl = `/DocumentApi/GetDocument?documentType=${documentTypeId}&accountId=${accountId}`;
        await performRequest(I, site, requestUrl);
    });
}

Feature('Получение информации о подписи текущего пользователя');
for (let i = 0; i < devSites.length; i++) {
    const site = devSites[i];
    Scenario(`GetCurrentUserSignData ${site}`, async ({ I }) => {
        const requestUrl = `/DocumentApi/GetCurrentUserSignData`;
        const flags = getFlags(true, false, false);
        await performRequest(I, site, requestUrl, flags);
    })
}


Feature('Получение информации о сертификате');
for (let i = 0; i < localSites.length; i++) {
    const site = localSites[i];
    Scenario.skip(`CertificateInfo ${site}`, async ({ I }) => {
        const documentId = 103;
        const tableId = 'divDocument'
        const requestUrl = `/DocumentApi/CertificateInfo?documentId=${documentId}&tableId=${tableId}`;
        await performRequest(I, site, requestUrl);
    }) 
}   

//#endregion

//#region Тесты POST-запросы
Feature('Авторизация по запросу'); //не работает
for (let i = 0; i < localSites.length; i++) {
    const site = localSites[i];
    Scenario.skip(`Authorize by request ${site}`, async ({ I }) => {
        const isChecking = true;
        await I.amOnPage(`${site}`);
        await I.wait(5);
        const tokenData = await GetAntiForgeryToken(I, site);
        await AuthorizeByRequest(I, site, tokenData, isChecking);
    })
}

Feature('Создание заказа на оплату услуг dev');
for (let i = 0; i < devSites.length; i++) {
    const site = devSites[i];
    Scenario.skip(`CreateOrder ${site}`, async ({ I }) => {
        const requestUrl = "/OrderServiceApi/CreateOrder";
        const flags: IFlags = getFlags(true, true, true);
        const headers = {};
        await performRequest(I, site, requestUrl, flags, headers, createOrderService);
    });
}

Feature('Создание заказа на оплату услуг localhost');
for (let i = 0; i < localSites.length; i++) {
    const site = localSites[i];
    Scenario.skip(`CreateOrder ${site}`, async ({ I }) => {
        const requestUrl = "/OrderServiceApi/CreateOrder";
        const flags: IFlags = getFlags(true, true, true);
        const headers = {};
        await performRequest(I, site, requestUrl, flags, headers, createOrderService);
    });
}

Feature('Создание лота через апи dev');
for (let i = 0; i < devSites.length; i++) {
    const site = devSites[i];
    Scenario.skip(`CreateLot ${site}`, async ({ I }) => {
        const requestUrl = `/TradeEditApi/SaveLot`;
        const flags: IFlags = getFlags(false, true, true);
        const headers = {};
        const response = await performRequest(I, site, requestUrl, flags, headers, lot);
        console.log(util.inspect(response.data), { depth: null, colors: true });
    })
}

Feature('Создание лота через апи localhost');
for (let i = 0; i < localSites.length; i++) {
    const site = localSites[i];
    Scenario.skip(`CreateLot ${site}`, async ({ I }) => {
        const requestUrl = `/TradeEditApi/SaveLot`;
        const flags: IFlags = getFlags(false, true, true);
        const headers = {};
        const response = await performRequest(I, site, requestUrl, flags, headers, lot);
        console.log(util.inspect(response.data), { depth: null, colors: true });
    })
}

//#endregion