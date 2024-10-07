УСТАНОВКА БИБЛИОТЕК:
1) npm init -y
2) npm install codeceptjs @codeceptjs/ui playwright codeceptjs-resemblehelper nyc
3) npx playwright install - для загрузки браузеров

ЗАПУСК:
1) npx codeceptjs run - обычный запуск в консоли
2) npx codeceptjs run --debug - запуск в консоли с перечислением шагов
3) npx codeceptjs run --verbose - запуск в консоли с более подробным перечислением шагов
4) npx codecept-ui --app - запуск через пользовательский интерфейс в режиме приложения
5) npx codecept-ui - запуск через пользовательский интерфейс в режиме сервера
6) npm run test:coverage - запуск через консоль, но с добавлением покрытия (скрипт в package.json)
7) (не факт, что нормально работает) npm run test:ui:coverage - запуск через пользовательский интерфейс, но с добавлением покрытия (скрипт в package.json) 
8) npx codeceptjs run --grep "getServiceByName" - запуск тестов, содержащих в названии строки, указанные в кавычках
9) npx codeceptjs run --reporter xunit - запуск с отчётом в нижеприведённом формате: 
****************************************************************************************
9.1) основная информация <testsuite name="Mocha Tests" tests="51" failures="0" errors="1" skipped="19" timestamp="Mon, 07 Oct 2024 13:21:02 GMT" time="249.304">

9.2) информация по сценарию <testcase classname="&#x41E;&#x442;&#x43A;&#x440;&#x44B;&#x442;&#x438;&#x435; &#x441;&#x442;&#x440;&#x430;&#x43D;&#x438;&#x446;&#x44B; &#x43B;&#x43E;&#x442;&#x430;:" name="openLotPage https://dev.realty.viomitra.ru" file="C:\Users\User\source\repos\ServiceAutoTest\tests\tests_test.ts" time="3.952"/>

9.3) информация об ошибке <testcase classname="&#x41F;&#x43E;&#x43B;&#x443;&#x447;&#x435;&#x43D;&#x438;&#x435; &#x434;&#x43E;&#x43A;&#x443;&#x43C;&#x435;&#x43D;&#x442;&#x430;:" name="getDocument https://dev.art.viomitra.ru" file="C:\Users\User\source\repos\ServiceAutoTest\tests\tests_test.ts" time="7.875"><failure>Field &#x22;Password&#x22; was not found by text|CSS|XPath
Error: Field &#x22;Password&#x22; was not found by text|CSS|XPath
    at new ElementNotFound (node_modules\codeceptjs\lib\helper\errors\ElementNotFound.js:15:11)
    at assertElementExists (node_modules\codeceptjs\lib\helper\Playwright.js:3742:11)
    at Playwright.fillField (node_modules\codeceptjs\lib\helper\Playwright.js:1741:5)
    at async Actor.enterToAccount (steps_file.ts:45:7)
    at async Actor.loginWithCookies (steps_file.ts:20:7)
    at async getResponseWithCookie (tests\tests_test.ts:71:26)
    at async performRequest (tests\tests_test.ts:131:20)
    at async Test.&#x3C;anonymous&#x3E; (tests\tests_test.ts:408:9)</failure></testcase>
*****************************************************************************************


ИНСТРУКЦИИ:
1) При создании нового файла с тестами, он должен заканчиваться на _test.ts, например, authorize_test.ts
2) Конфигурация codecepts в codecept.conf.ts
3) Кастомные методы в /steps_file.ts или в самом файле, где сценарии. В первом случае вызов через объект теста I (I.something), во втором something.
4) Подключение методов некоторых библиотек типа REST в extends в файле steps.d.ts
5) Все тесты в файле /tests/tests_test.ts
6) Используются helpers Playwright и Rest (движки), которые наследует I (объект codeceptjs)
7) Для просмотра результатов покрытия зайти на index.html в папке корневой директории coverage 
8) Покрытие формируется по количеству пройденных и пропущенных тестов
9) В файле, где отображено покрытие следующие колонки: statement - покрытие команд, branches - покрытие веток (блоки if), functions - покрытие функций, lines - покрытие строк, последняя колонка - выполненные строки/все строки
10) Конфигурация покрытия в файле .nycrc.json
11) Скрипты для запуска в package.json
12) При запуске всех тестов, некоторые тесты могут проваливаться, можно их запустить через UI и удобно запустить отдельно блоки кода и добрать неудавшиеся тесты.
13) Также отдельные тесты можно запустить с помощью команды npx codeceptjs run --grep "getServiceByName", где в кавычках название сценария (наличие данных строк в названии сценария (contains))

СТРУКТУРА ТЕСТОВ:
1) Feature('Группировка связанных сценариев')
2) Scenario('Конкретный сценарий', ({ I }) => {})
3) I - объект codeceptjs, через который вызываются методы
4) Scenario.skip - пропуск сценария
5) Scenario.only - выполнение только данного сценария
6) Библиотека assert для проверки условий в тестах
7) Модуль config для обращения к свойствам конфигурации (codecept.conf.ts)

ОТЛАДКА:
1) npx codeceptjs run --debug - запуск в консоли с перечислением шагов
2) npx codeceptjs run --verbose - запуск в консоли с более подробным перечислением шагов
3) console.log(util.inspect(response.data, { depth: null, colors: true })); - логи в консоль при больших json-файлах
4) util.inspect - функция библиотеки, позволяющая обойти цикличность в json-файле и отобразить его без ошибок в читаемом формате
5) Свойство depth указывает глубину вложенности, colors - выделение цветом для читаемости

СПИСОК ПРОБЛЕМНЫХ АПИ:
1) /OrderServiceApi/GetPurchasedServicesByAccountId - нет апи для получения аккаунта по хешу
2) /DocumentApi/CertificateInfo - возвращает 204 (No Content, не ищет документ, который есть в базе)




