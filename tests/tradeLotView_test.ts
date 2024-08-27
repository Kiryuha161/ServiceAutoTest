Feature('GET-запрос на страницу лота');

Scenario('tradeLotView',  async ({ I }) => {
    const response = await I.sendGetRequest("/TradeLot/View/223");
    response.status === 200;
}).config('REST', { endpoint: 'http://localhost:56993/' });