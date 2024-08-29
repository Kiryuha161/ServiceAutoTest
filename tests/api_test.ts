import { get } from "http";

const config = require('../codecept.conf').config;
const assert = require('assert');
const util = require('util'); //используется для логов

const loginUrl = '/Account/Login';
const devSites = config.sites;
const localSites = config.localhostSites;
const productSites = config.productSites;
const authorizeUser = {
    //username: 'param0n61@yandex.ru',
    username: 'kiryuha161@gmail.com',
    password: '25031993Pko'
}

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
 * Получает ответ сервера с куками
 * @param I объект теста
 * @param authorizeUrl адрес авторизации
 * @param requestUrl адрос запроса
 * @param username логин пользователя
 * @param password пароль пользователя
 * @returns 
 */
const getResponseWithCookie = async (I, authorizeUrl, requestUrl, username, password) => {
    const cookieString = await I.loginWithCookies(authorizeUrl, username, password);
    const response = await I.sendGetRequest(requestUrl, { Cookie: cookieString });

    return response;
}

/**
 * Добавляет заголовок запроса
 * @param I объект теста
 * @param property свойство заголовка запроса
 * @param value значение свойства заголовка запроса
 */
const addHeader = async (I, property, value) => {
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
 * @param headers (не обязательно, по умолчанию пустой объект) заголовки запроса
 * @returns в случае, если проверка ответа сервера не требуется, возвращает ответ
 */
const performRequest = async (I: CodeceptJS.I, site: string, requestUrl: string, isChecking: boolean = true, isApiResult: boolean = true, headers: object = {}) => {
    for (const [property, value] of Object.entries(headers)) {
        await addHeader(I, property, value)
    }

    const response = await getResponseWithCookie(I, `${site}${loginUrl}`, `${site}${requestUrl}`, authorizeUser.username, authorizeUser.password);

    if (isChecking) {
        if (isApiResult) {
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
 * @returns объект, со свойствами isChecking и isApiResult
 */
const getFlags = (isChecking, isApiResult) => {
    return {
        isChecking: isChecking,
        isApiResult: isApiResult
    }
}

Feature('GET-запрос на страницу лота, проверка на статус');
config.sites.forEach(site => {
    Scenario(`tradeLotView ${site}`, async ({ I }) => {
        const response = await I.sendGetRequest(`${site}/TradeLot/View/223`);
        assert.equal(response.status, 200, 'Статус - не ок');
    });
});


Feature('Авторизация пользователя и выход из аккаунта');
devSites.forEach(site => {
    Scenario(`authorizeUserAndQuit ${site}`, async ({ I }) => {
        await I.enterToAccount(`${site}${loginUrl}`, 'param0n61@yandex.ru', '25031993Pko');

        I.click('a[title="Выйти"]');
        I.click("Выйти");
        I.see("Присоединиться");
    });
});


Feature('Авторизация пользователя и покупка лота');
for (let i = 0; i < devSites.length; i++) {
    if (i !== 2) { // не перебирает Viomitra.China, так как там нет страниц с возможностью "Купить сейчас"
        const site = devSites[i];
        const pages = [
            "/zemelnyj-uastok-po-adresu-g-moskva-frunzenska-naberena-30-s5-6_1025",
            "/tests_2480"
        ];

        Scenario(`authorizeUserAndBuyLot ${site}`, async ({ I }) => {
            await I.enterToAccount(`${site}${loginUrl}`, authorizeUser.username, authorizeUser.password);

            I.amOnPage(`${site}${pages[i]}`);
            I.click('Купить сейчас');
            I.see('ОПЛАТА КОММИССИИ');
            I.click('Оплатить');
        });
    }
}

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
        const flag = getFlags(true, true);
        await performRequest(I, site, requestUrl, flag.isChecking, flag.isApiResult, {'id': 2});
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
        const flag = getFlags(true, true);
        await performRequest(I, site, requestUrl, flag.isChecking, flag.isApiResult, {'orderId': 13});
    })
} 

Feature('Получение данных заказа услуг по accountId');
for (let i = 0; i < devSites.length; i++) {
    const site = devSites[i];
    Scenario(`GetOrderServicesByAccountId ${site}`, async ({ I }) => {
        const requestUrl = '/OrderServiceApi/GetOrderServicesByAccountId';
        const flag = getFlags(true, true);
        await performRequest(I, site, requestUrl, flag.isChecking, flag.isApiResult, {'accountId': 1751});
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
for (let i = 0; i < productSites.length; i++) {
    const site = productSites[i];
    Scenario(`GetCurrentUserSignData ${site}`, async ({ I }) => {
        const requestUrl = `/DocumentApi/GetCurrentUserSignData`;
        const flag = getFlags(true, false);
        await performRequest(I, site, requestUrl, flag.isChecking, flag.isApiResult);
    })
} 

/* вопросы к апи 
Feature('Получение информации о сертификате');
for (let i = 0; i < localSites.length; i++) {
    const site = localSites[i];
    Scenario(`CertificateInfo ${site}`, async ({ I }) => {
        const documentId = 103;
        const tableId = 'divDocument'
        const requestUrl = `/DocumentApi/CertificateInfo?documentId=${documentId}&tableId=${tableId}`;
        await performRequest(I, site, requestUrl);
    }) 
}   */

