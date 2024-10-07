const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './tests/*_test.ts',
  output: './output',
  "timeout": 120000,
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://dev.realty.viomitra.ru/',
      show: true,
      restart: false,
      waitForTimeout: 120000,
      getPageTimeout: 120000
    },
    REST: {
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      endpoint: 'https://dev.realty.viomitra.ru/',
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'ServiceAutoTest',
  sites: [
    "https://dev.realty.viomitra.ru",
    "https://dev.art.viomitra.ru",
    "https://dev.china.viomitra.ru",
  ],
  localhostSites: [
    "http://localhost:56993"
  ],
  productSites: [
    "https://invest.viomitra.ru",
    "https://art.viomitra.ru",
    "https://china.viomitra.ru"
  ]
};