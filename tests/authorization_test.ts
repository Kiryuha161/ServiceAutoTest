Feature('Авторизация пользователя');

Scenario('authorizeUser',  ({ I }) => {
    I.amOnPage('http://localhost:56993/Account/Login');
    I.fillField('UserName', 'kiryuha161@gmail.com'); 
    I.fillField('Password', '25031993Pko');
    I.click('Войти');
});