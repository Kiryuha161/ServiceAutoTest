1) npm init -y
2) npm install codeceptjs playwright codeceptjs-resemblehelper
3) npx codeceptjs run - запуск (npx codeceptjs run --debug для отладки)
4) npx playwright install - для загрузки браузеров
5) для названия тестов использовать после названия _test.ts

Конфигурация codecepts в codecept.conf.ts
Кастомные методы в /steps_file.ts или в самом файле, где сценарии. В первом случае вызов через объект теста I (I.something), во втором something
Подключение методов некоторых библиотек типа REST в extends в файле steps.d.ts

Тесты запросов по апи в /tests/api_test.ts

Feature('Группировка связанных сценариев')
Scenario('Конкретный сценарий')

Scenario.skip - пропуск сценария
Scenario.only - выполнение только данного сценария

Проверка в логах json-объекта:
console.log(util.inspect(response.data, { depth: null, colors: true }));

util.inspect - функция библиотеки, позволяющая обойти цикличность в json-файле и отобразить его без ошибок в читаемом формате
Свойство depth указывает глубину вложенности, colors - выделение цветом для читаемости

Библиотека assert для проверки условий в тестах
Модуль config для обращения к свойствам конфигурации (codecept.conf.ts)

При создании нового файла с тестами, он должен заканчиваться на _test.ts, например, authorize_test.ts

Список проблемных апи
1) /OrderServiceApi/GetPurchasedServicesByAccountId - нет апи для получения аккаунта по хешу
2) /DocumentApi/CertificateInfo - возвращает 204 (No Content, не ищет документ, который есть в базе)




