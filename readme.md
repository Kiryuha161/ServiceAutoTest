1) npm init -y
2) npm install codeceptjs playwright codeceptjs-resemblehelper
3) npx codeceptjs run - запуск
4) npx playwright install - для загрузки браузеров
5) для названия тестов использовать после названия _test.ts

Конфигурация codecepts в codecept.conf.ts
Кастомные методы в /steps_file.ts
Подключение методов некоторых библиотек типа REST в extends в файле steps.d.ts

Тесты по апи в /tests/api_test.ts
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




