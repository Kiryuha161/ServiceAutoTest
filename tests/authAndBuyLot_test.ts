Feature('Авторизация пользователя и покупка лота');

Scenario('authorizeUserAndBuyLot',  ({ I }) => {
    I.amOnPage('http://localhost:56993/Account/Login');
    I.fillField('UserName', 'param0n61@yandex.ru');
    I.fillField('Password', '25031993Pko');
    I.click('Войти');
    I.amOnPage("http://localhost:56993/TradeLot/View/352");
    I.see('ЗАПРОС НА ВОЗВРАТ ЗАДАТКА | ПОХОЖИЕ ЛОТЫ', 'h2');
    I.click('Купить сейчас');
    I.see('ОПЛАТА КОММИССИИ');
});