Feature('Открытие страницы лота');

const pages = [
    "https://dev.realty.viomitra.ru/tes-bez-r11_1051",
    "https://dev.art.viomitra.ru/tests_2480",
    "https://dev.china.viomitra.ru/sedelnyj-tga-faw-j7-4h2-2024g_585",
]

pages.forEach(page => {
    Scenario.skip(`openLotPage ${page}`,  ({ I }) => {
        I.amOnPage(page);
        I.see("Продавец");
    });
});
