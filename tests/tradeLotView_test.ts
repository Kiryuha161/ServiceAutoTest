const assert = require('assert');

Feature('GET-запрос на страницу лота, проверка на статус');

Scenario('tradeLotView',  async ({ I }) => {
    const response = await I.sendGetRequest("/TradeLot/View/223");
    assert.equal(response.status, 200, 'Статус - не ок');
}).config('REST', { endpoint: 'http://localhost:56993/' });